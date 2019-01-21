import React from 'react';
import TableRow from 'Components/Spreadsheet/TableRow';
import * as localStore from 'Components/Generics/Localstore';

class SpreadsheetTable extends React.Component {
  state = {
    headerCell: []
  }

  componentDidMount() {
    let headerCell = localStore.getColumnData('columnData');
    this.setState({ headerCell: headerCell }); 
  }
  render() {
    const { tableUpdate, rowAdd, rowDel, filterText, tableData } = this.props;
    var rowData = tableData.map(function(rowData) {
      if (rowData.name.indexOf(filterText) === -1) {
        return false;
      }
      return (
        <TableRow 
          tableUpdate={tableUpdate}
          rowData={rowData}
          onDelEvent={e => rowDel(e)}
          key={rowData.id}/>)
    });
    const { headerCell } = this.state;
    return (
      <div>
        <button 
          type="button"
          onClick={rowAdd}
          className="btn">Add</button>
        <table className="table table-bordered">
          <thead>
            <tr>  
              {
                headerCell.map((cell, index) => 
                <th key={cell}>
                  <input 
                    type='text'
                    name={cell.columnTitle}
                    value={cell.columnTitle} 
                    onChange={this.tableUpdate} />
                </th>)
              }
            </tr>
          </thead>
          <tbody>{rowData}</tbody>
        </table>
      </div>
    );
  }
}

export default SpreadsheetTable;
