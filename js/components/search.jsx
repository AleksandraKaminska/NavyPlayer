import React from 'react';
import	{	Router,
		Route,
		Link,
		IndexLink,
		IndexRoute,
		hashHistory
}	from	'react-router';
import Autocomplete from 'react-autocomplete';

class Search extends React.Component {
  handlerRenderItem = (item, isHighlighted) => {
    const style = {
      item: {
        padding: '2px 6px',
        background: '#333',
        color: 'white',
        fontFamily: 'Raleway',
        fontSize: '1.2em',
        width: '100%'
      },
      highlightedItem: {
        color: 'white',
        background: '#14375A',
        padding: '2px 6px',
        cursor: 'pointer',
        fontFamily: 'Raleway',
        fontSize: '1.2em',
        width: '100%'
      }
    };
    return <div
        style={isHighlighted ? style.highlightedItem : style.item}
        key={item.id}
        id={item.id}>
        <div style={{maxWidth: '24vw', float: 'left', overflowWrap: 'break-word'}}>{item.title_short} - {item.artist.name}</div>
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
        renderItem={this.handlerRenderItem} />
    </div>
  }
}

export default Search
