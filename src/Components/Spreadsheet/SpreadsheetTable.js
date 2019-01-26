// SpreadSheet main page

import React from 'react';
import TableRow from 'Components/Spreadsheet/TableRow';
class SpreadsheetTable extends React.Component {
  render() {
    const { tableUpdate, columnUpdate, rowAdd, 
      tableData, columnData, setCurrentColumn,
      validateCell, error } = this.props;
    var rowData = tableData.map(function(rowData) {
      return (
        <TableRow 
          tableUpdate={tableUpdate}
          columnData={columnData}
          rowData={rowData}
          validateCell={validateCell}
          error={error}
          key={rowData.id}/>)
    });
    return (
      <div>
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
        <button 
          type="button"
          onClick={rowAdd}
          className="btn">Add 10 rows</button>
      </div>
    );
  }
}

export default SpreadsheetTable;
