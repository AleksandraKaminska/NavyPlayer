import React from 'react';
import Autocomplete from 'react-autocomplete';

// Redux
import store from './../store';
import { connect } from 'react-redux';
import {
  searchTracksAction,
  autocompleteAction,
  changeTrackAction
} from './../actions/index.js';

const promise = new Promise((resolve, reject) => {
  true ? resolve("Stuff worked!") : reject(Error("It broke"));
});

class Search extends React.Component {
  handlerRenderItem = (item, isHighlighted) => {
    const style = {
      item: {
        padding: '1.5vh 6px',
        background: '#111',
        width: '100%',
        height: '14vh'
      },
      highlightedItem: {
        background: '#046380',
        padding: '1.5vh 6px',
        cursor: 'pointer',
        width: '100%',
        height: '14vh'
      }
    };
    return <div key={item.id} style={isHighlighted ? style.highlightedItem : style.item}>
        <div style={{
            maxWidth: 'calc(100% - 3.5em)',
            float: 'left',
            overflowWrap: 'break-word',
            color: 'white',
            fontFamily: 'Raleway',
            fontSize: '1.2em'
          }}>
          <p>{item.title_short} - {item.artist.name}</p>
        </div>
        <img src={item.album.cover} width='50em' height='50em' alt='cover'/>
      </div>
  }

  searchArtist = () => {
    $.ajax({
      dataType: "jsonp",
      url: `https://api.deezer.com/artist/${this.props.track.artist.id}?output=jsonp`,
      success: response => store.dispatch({ type: 'FIND_ARTIST', artist: response })
    });
  }

  searchTopTracks = () => {
    $.ajax({
        dataType: "jsonp",
        url :`https://api.deezer.com/artist/${this.props.track.artist.id}/top?output=jsonp`,
        success : response => store.dispatch({ type: 'FIND_TOP_TRACKS', topTracks: response.data })
    });
  }

  searchConcerts = () => {
    $.ajax({
      dataType: "json",
      url: `https://rest.bandsintown.com/artists/${this.props.track.artist.name}/events?app_id=NavyPlayer`,
      success: response => store.dispatch({ type: 'FIND_CONCERTS', concerts: response })
    });
  }

  searchSimilarArtists = () => {
    $.ajax({
        dataType: "jsonp",
        url :`https://api.deezer.com/artist/${this.props.track.artist.id}/related?limit=10&output=jsonp`,
        success : response => store.dispatch({ type: 'FIND_SIMILAR_ARTISTS', similar: response.data })
    });
  }

  handleSelect = (value, item) => {
    store.dispatch(changeTrackAction(item));
    promise.then(result => {
      store.dispatch(autocompleteAction(value));
      this.searchArtist();
      this.searchConcerts();
      this.searchTopTracks();
      this.searchSimilarArtists();
      DZ.player.pause();
      DZ.player.playTracks([this.props.track.id]);
      store.dispatch(autocompleteAction(""));
    }, err => console.log(err));
  }

  handleChange = (event) => {
    store.dispatch(autocompleteAction(event.target.value));
    if(this.props.autocompleteValue !== '') {
      DZ.api(`/search?q=${this.props.autocompleteValue}`, response => {
        store.dispatch(searchTracksAction(response.data));
      });
    }
  }

  render() {
    const inputProps = {
      placeholder: "Search tracks",
      title: "Search tracks"
    };
    return <div className="search">
      <Autocomplete
        ref="autocomplete"
        inputProps={inputProps}
        value={this.props.autocompleteValue}
        items={this.props.searchTracks}
        getItemValue={item => item.title_short}
        onSelect={this.handleSelect}
        onChange={this.handleChange}
        renderItem={this.handlerRenderItem}/>
      <div className='placeholder'
        style={{
          height: '63vh',
          width: '100%',
          background: '#111'
        }}>
      </div>
    </div>
  }
}

const mapStateToProps = store => {
  return {
    searchTracks: store.searchTracks,
    autocompleteValue: store.autocompleteValue,
    track: store.track
  };
};

export default connect(mapStateToProps)(Search);
