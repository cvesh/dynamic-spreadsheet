import React from 'react';

class SearchBar extends React.Component {
  handleChange = () => {
    this.props.onUserInput(this.refs.filterTextInput.value);
  }

  render() {
    return (
      <div>
        <input
          type="text"
          placeholder="Search" 
          value={this.props.filterText}
          ref="filterTextInput"
          onChange={e => this.handleChange(e)} />
      </div>
    );
  }
}

export default SearchBar;