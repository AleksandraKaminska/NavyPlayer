import React from 'react';
import Autocomplete from 'react-autocomplete';
import store from './../store';
import { connect } from 'react-redux';
import {
  searchTracksAction,
  autocompleteAction,
  completeAction,
  changeTrackAction
} from './../actions/index.js';

const promise = new Promise(function(resolve, reject) {
  true ? resolve("Stuff worked!") : reject(Error("It broke"));
});

class Search extends React.Component {
  constructor(props) {
     super(props);
     this.state = ({
       val: this.props.autocompleteValue
     });
     this.pom = [];
  }

  handlerRenderItem = (item, isHighlighted) => {
    const style = {
      item: {
        padding: '2px 6px',
        background: '#111',
        width: '100%',
        height: '14vh'
      },
      highlightedItem: {
        background: '#14375A',
        padding: '2px 6px',
        cursor: 'pointer',
        width: '100%',
        height: '14vh'
      }
    };
    return <div key={item.id}
        style={isHighlighted ? style.highlightedItem : style.item}>
        <div style={{
            maxWidth: 'calc(100% - 75px)',
            float: 'left',
            overflowWrap: 'break-word',
            color: 'white',
            fontFamily: 'Raleway',
            fontSize: '1.2em'
          }}>
          <p>{item.title_short} - {item.artist.name}</p>
        </div>
        <img src={item.album.cover} width='64px' height='64px' alt='cover'/>
      </div>
  }

  handleSelect = (value, item) => {
    store.dispatch(changeTrackAction(item));
    promise.then(result => {
      store.dispatch(completeAction(value));
      this.props.searchArtist();
      this.props.searchConcerts();
      DZ.player.pause();
      DZ.player.playTracks([this.props.track.id]);
      store.dispatch(completeAction(""));
    }, function(err) {
      console.log(err);
    });
  }

  handleChange = (event) => {
    store.dispatch(autocompleteAction(event.target.value));
      if(this.props.autocompleteValue !== '') {
        DZ.api(`/search?q=${this.props.autocompleteValue}`, response => {
            this.pom = response.data;
        });
        store.dispatch(searchTracksAction(this.pom));
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
        value={this.state.val}
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

const mapStateToProps = function(store) {
  return {
    searchTracks: store.searchTracks,
    autocompleteValue: store.autocompleteValue,
    track: store.track
  };
};

export default connect(mapStateToProps)(Search);
