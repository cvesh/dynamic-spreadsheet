import React from 'react';
import SearchBar from 'Components/Form/SearchBar';
import SpreadsheetTable from 'Components/Spreadsheet/SpreadsheetTable';
import * as localStore from 'Components/Generics/Localstore';

class Table extends React.Component {
  state = {
    filterText: '',
    tableData: [],
    columnData: []
  }

  componentDidMount() {
    let columnData = localStore.getData('columnData');
    this.setState({ columnData: columnData });
    if(this.state.tableData.length === 0 && columnData)
      this.handleAddEvent();
  }

  handleUserInput  = filterText => {
    this.setState({filterText: filterText});
  };

  handleRowDel = rowData => {
    let index = this.state.tableData.indexOf(rowData);
    this.state.tableData.splice(index, 1);
    this.setState(this.state.tableData);
  };

  handleAddEvent = () => {
    let columnData = localStore.getData('columnData');
    let tableData = this.state.tableData;
    for (let i = 1; i <= 10; i++) {
      let emptyData = {
        id: (tableData.length + 1).toString(),
      }
      columnData.map((column) => {
        let columnTitle = column.columnTitle.trim();
        emptyData[columnTitle] = '';
      });
      tableData.push(emptyData);
    } 
    this.setState(tableData);
    // console.log(this.state.tableData)
  }

  handleTableUpdate = event => {
    let item = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value
    };
    console.log(item)
    let tableData = this.state.tableData.slice();
    let newTableData = tableData.map(function(rowData) {
      for (let key in rowData) {
        if (key === item.name && rowData.id === item.id) {
          rowData[key] = item.value;
        }
      }
      return rowData;
    });
    this.setState({tableData: newTableData});
  };

  handleColumnUpdate = (event, columnData) => {
    let item = {
      id: parseInt(event.target.id),
      name: event.target.name,
      value: event.target.value
    };
    let newColumnData = columnData.slice().map(function(rowData) {
      for (let key in rowData) {
        console.log(item.name)
        if (key === item.name && rowData.id === item.id) {
          console.log('test');
          rowData[key] = item.value;
        }
      }
      return rowData;
    });
    this.setState({columnData: newColumnData});
    localStore.setData('columnData', newColumnData);
  }

  render() {
    const { tableData, columnData, filterText } = this.state;
    return (
      <div>
        <SearchBar 
          filterText={filterText}
          onUserInput={e => this.handleUserInput(e)} />
        {columnData &&
          <SpreadsheetTable 
          columnUpdate={this.handleColumnUpdate}
          tableUpdate={e => this.handleTableUpdate(e)}
          rowAdd={e => this.handleAddEvent(e)}
          rowDel={e =>this.handleRowDel(e)}
          tableData={tableData}
          columnData={columnData}
          filterText={filterText} />
         }
      </div>
    );
  }
}

export default Table;
