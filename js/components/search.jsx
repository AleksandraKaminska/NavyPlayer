import React from 'react';
import Autosuggest from 'react-autosuggest';

class Search extends React.Component{
  getSuggestionValue = (suggestion) => {
    return suggestion.title_short;
  }

  renderSuggestion = (suggestion) => {
    return (
      <div>{suggestion.title_short}</div>
    );
  }

  render() {
    const { value, suggestions } = this.props.state;
    const inputProps = {
      placeholder: "Search",
      value: this.props.value,
      onChange: this.props.onChange
    };
    return <div className="search">
        <Autosuggest
          suggestions={this.props.suggestions}
          onSuggestionsFetchRequested={this.props.onSuggestionsFetchRequested}
          onSuggestionsClearRequested={this.props.onSuggestionsClearRequested}
          getSuggestionValue={this.getSuggestionValue}
          renderSuggestion={this.renderSuggestion}
          inputProps={inputProps} />
    </div>
  }
}

export default Search
