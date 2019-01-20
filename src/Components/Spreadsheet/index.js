import React from 'react';
import SearchBar from 'Components/Form/SearchBar';
import SpreadsheetTable from 'Components/Spreadsheet/SpreadsheetTable';

class Table extends React.Component {
  state = {
    filterText: '',
    tableData: [
      {
        id: '1',
        category: 'Sporting Goods',
        price: '49.99',
        qty: 12,
        name: 'football'
      }, {
        id: '2',
        category: 'Sporting Goods',
        price: '9.99',
        qty: 15,
        name: 'baseball'
      }, {
        id: '3',
        category: 'Sporting Goods',
        price: '29.99',
        qty: 14,
        name: 'basketball'
      }, {
        id: '4',
        category: 'Electronics',
        price: '99.99',
        qty: 34,
        name: 'iPod Touch'
      }, {
        id: '5',
        category: 'Electronics',
        price: '399.99',
        qty: 12,
        name: 'iPhone 5'
      }, {
        id: '6',
        category: 'Electronics',
        price: '199.99',
        qty: 23,
        name: 'nexus 7'
      }
    ]
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
    let id = (+ new Date() + Math.floor(Math.random() * 999999)).toString(36);
    let emptyData = {
      id: id,
      name: "",
      price: "",
      category: "",
      qty: 0
    }
    this.state.tableData.push(emptyData);
    this.setState(this.state.tableData);

  }

  handleTableUpdate = event => {
    let item = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value
    };
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

  render() {
    const { tableData, filterText } = this.state;
    return (
      <div>
        <SearchBar 
          filterText={filterText}
          onUserInput={e => this.handleUserInput(e)} />
        <SpreadsheetTable 
          tableUpdate={e => this.handleTableUpdate(e)}
          rowAdd={e => this.handleAddEvent(e)}
          rowDel={e =>this.handleRowDel(e)}
          tableData={tableData}
          filterText={filterText} />
      </div>
    );
  }
}

export default Table;
