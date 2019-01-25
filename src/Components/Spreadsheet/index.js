import React from 'react';
import SearchBar from 'Components/Form/SearchBar';
import ColumnForm from 'Components/Form/ColumnForm';
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
    let tableData = localStore.getData('tableData');
    tableData = tableData ? tableData : []
    this.setState({ 
      columnData: columnData
    });
    if(tableData.length === 0 && columnData)
      this.handleAddEvent();
    else
      this.setState({ tableData: tableData });
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
        return emptyData;
      });
      tableData.push(emptyData);
    } 
    this.setState(tableData);
    localStore.setData('tableData', tableData);
    
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
    localStore.setData('tableData', newTableData);
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

  appendColumnData = (newKey) => {
    let columnData = localStore.getData('columnData');
    this.setState({ columnData: columnData })
    let tableData = localStore.getData('tableData');
    if(tableData) {
      let newTableData = tableData.map(function(rowData) {
        if(!(newKey in rowData))
          rowData[newKey] = '';
        return rowData;
      });
      this.setState({ tableData: newTableData });
      localStore.setData('tableData', newTableData);
    }
    else
      this.handleAddEvent();
  }

  render() {
    const { tableData, columnData, filterText } = this.state;
    return (
      <div>
        <ColumnForm
          appendColumnData={e => this.appendColumnData(e)}
        />
        {/* <SearchBar 
          filterText={filterText}
          onUserInput={e => this.handleUserInput(e)} /> */}
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
