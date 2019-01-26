import React from 'react';
import ColumnForm from 'Components/Form/ColumnForm';
import SpreadsheetTable from 'Components/Spreadsheet/SpreadsheetTable';
import * as localStore from 'Components/Generics/Localstore';

class Table extends React.Component {
  state = {
    tableData: [],
    columnData: [],
    currentColumn: '',
    error: false
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

  // This will add / append 10 rows 
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

  // This will update table cell onChange
  handleTableUpdate = event => {
    let item = {
      id: event.target.id,
      name: event.target.name,
      value: event.target.value
    };
    let tableData = this.state.tableData;
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

  // This updates first row with column title onChange
  handleColumnUpdate = (event, columnData) => {
    let currentColumn = this.state.currentColumn;
    let tableData = this.state.tableData;
    let item = {
      id: parseInt(event.target.id),
      name: event.target.name,
      value: event.target.value
    };
    let newTableData = tableData.map(function(rowData) {
      if (currentColumn !== item.value) {
        rowData[item.value] = rowData[currentColumn];
        delete rowData[currentColumn];
      }
      return rowData;
    });
    let newColumnData = columnData.map(function(rowData) {
      for (let key in rowData) {
        if (key === item.name && rowData.id === item.id)
          rowData[key] = item.value;
      }
      return rowData;
    });
    this.setState({
      tableData: newTableData,
      columnData: newColumnData,
      currentColumn: item.value});
    localStore.setData('tableData', newTableData);
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

  setCurrentColumn = (e) => {
    this.setState({ currentColumn: e.target.value });
  }

  validateCell = (e, type) => {
    let value = e.target.value.trim();
    let  dateRegex = /(0[1-9]|[12][0-9]|3[01])[- /.](0[1-9]|1[012])[- /.](19|20)\d\d/;
    if(e.target.required && value.length === 0){
      e.target.classList.add('error');
      return;
    }
    else
      e.target.classList.remove('error');
    if (type === 'number' && isNaN(value))
      e.target.classList.add('error')
    else
      e.target.classList.remove('error');
    if(type === 'date' && !value.match(dateRegex))
      e.target.classList.add('error')
    else
      e.target.classList.remove('error');
  }

  render() {
    const { tableData, columnData, error } = this.state;
    return (
      <div>
        <ColumnForm
          appendColumnData={e => this.appendColumnData(e)}
        />
        {columnData &&
          <SpreadsheetTable 
          columnUpdate={this.handleColumnUpdate}
          tableUpdate={e => this.handleTableUpdate(e)}
          rowAdd={e => this.handleAddEvent(e)}
          tableData={tableData}
          columnData={columnData}
          setCurrentColumn={this.setCurrentColumn}
          validateCell={this.validateCell}
          error={error} />
         }
      </div>
    );
  }
}

export default Table;
