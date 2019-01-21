import React from 'react';
import './App.css';
import ColumnForm from 'Components/Form/ColumnForm';
import Spreadsheet from 'Components/Spreadsheet';
import * as localStore from 'Components/Generics/Localstore';
class App extends React.Component {
  state = {
    columnData: null
  }

  componentDidMount() {
    console.log(this.state.columnData)
    let columnData = localStore.getColumnData('columnData');
    if(columnData)
      this.setState({columnData: columnData});
  }

  render() {
    return (
      <div className="App">
        {
          this.state.columnData ? <Spreadsheet /> : <ColumnForm />
        }
      </div>
    );
  }
}

export default App;
