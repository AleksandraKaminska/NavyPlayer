import React from 'react';
import Autocomplete from 'react-autocomplete';

class Search extends React.Component{
  handleRenderItem = (item, isHighlighted) => {
    const style = {
      item: {
        padding: '2px 6px',
        cursor: 'default',
        background: '#333',
        color: 'white',
        fontFamily: 'Raleway',
        width: '100%',
        zIndex: '3'
      },
      highlightedItem: {
        color: 'white',
        background: '#14375A',
        padding: '2px 6px',
        cursor: 'default',
        fontFamily: 'Raleway',
        width: '100%',
        zIndex: '3'
      }
    };
    return <div
        style={isHighlighted ? style.highlightedItem : style.item}
        key={item.id}
        id={item.id}
      >{item.title_short}</div>
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
        renderItem={this.handleRenderItem} />
    </div>
  }
}

export default Search
