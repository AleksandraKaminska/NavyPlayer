import React from 'react';
import Autocomplete from 'react-autocomplete';

class Search extends React.Component{
  handleRenderItem = (item, isHighlighted) => {
    const style = {
      item: {
        padding: '2px 6px',
        cursor: 'default',
        background: '#bdd4de',
        color: 'black',
        fontFamily: 'Raleway',
        width: '100%',
        cursor: 'pointer'
      },
      highlightedItem: {
        color: 'black',
        background: '#efefef',
        padding: '2px 6px',
        cursor: 'default',
        fontFamily: 'Raleway',
        width: '100%',
        cursor: 'pointer'
      }
    };
    return <div style={{background: '#bdd4de', cursor: 'pointer'}} >
      <img style={{display: 'inline-block'}} src={item.cover} />
      <div
        style={isHighlighted ? style.highlightedItem : style.item}
        key={item.id}
        id={item.id}>
          {item.title_short}
      </div>

      </div>
  }
  render() {
    return (
      <div className="search">
        <Autocomplete
          ref="autocomplete"
          inputProps={{title: "Title"}}
          value={this.props.autoCompleteValue}
          items={this.props.searchTracks}
          getItemValue={(item) => item.title_short}
          onSelect={this.props.handleSelect}
          onChange={this.props.handleChange}
          renderItem={this.handleRenderItem.bind(this)} />
      </div>
    );
  }
}

export default Search
