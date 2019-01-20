import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Form from 'Components/Form';
import Spreadsheet from 'Components/Spreadsheet';

class App extends Component {
  render() {
    return (
      <div className="App">
        <Spreadsheet />
      </div>
    );
  }
}

export default App;
