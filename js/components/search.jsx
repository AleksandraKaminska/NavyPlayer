import React from 'react';
import Autocomplete from 'react-autocomplete';
import store from '../store';
import { connect } from 'react-redux';

class Search extends React.Component {
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
    return <div
        style={isHighlighted ? style.highlightedItem : style.item}
        key={item.id}
        id={item.id}>
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

  render() {
    const inputProps = {
      placeholder: "Search tracks",
      title: "Search tracks"
    };
    return <div className="search">
      <Autocomplete
        ref="autocomplete"
        inputProps={inputProps}
        value={this.props.autoCompleteValue}
        items={this.props.searchTracks}
        getItemValue={item => item.title_short}
        onSelect={this.props.handleSelect}
        onChange={this.props.handleChange}
        renderItem={this.handlerRenderItem}/>
      <div className='placeholder'
        style={{
          height: '63vh',
          width: '100%',
          background: '#111'
        }}></div>
    </div>
  }
}

const mapStateToProps = function(store) {
  return {
    searchTracks: store.searchTracks
  };
};

export default connect(mapStateToProps)(Search);
