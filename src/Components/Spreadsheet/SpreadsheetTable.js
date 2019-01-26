import React from 'react';
import TableRow from 'Components/Spreadsheet/TableRow';
class SpreadsheetTable extends React.Component {
  render() {
    const { tableUpdate, columnUpdate, rowAdd, 
      filterText, tableData, columnData, setCurrentColumn } = this.props;
    var rowData = tableData.map(function(rowData) {
      // if (rowData.name.indexOf(filterText) === -1) {
      //   return false;
      // }
      return (
        <TableRow 
          tableUpdate={tableUpdate}
          columnData={columnData}
          rowData={rowData}
          key={rowData.id}/>)
    });
    return (
      <div>
        <button 
          type="button"
          onClick={rowAdd}
          className="btn">Add</button>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Row Number</th>
              {
                columnData.map((cell, index) => 
                <th key={index}>
                  <input 
                    id={cell.id}
                    type='text'
                    name='columnTitle'
                    value={cell.columnTitle}
                    onFocus={e => setCurrentColumn(e)}
                    onChange={e => columnUpdate(e, columnData)} />
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
