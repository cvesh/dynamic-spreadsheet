import React from 'react';
import TableRow from 'Components/Spreadsheet/TableRow';

class SpreadsheetTable extends React.Component {
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
    return (
      <div>
        <button 
          type="button"
          onClick={rowAdd}
          className="btn">Add</button>
        <table className="table table-bordered">
          <thead>
            <tr>
              <th>Name</th>
              <th>price</th>
              <th>quantity</th>
              <th>category</th>
            </tr>
          </thead>
          <tbody>{rowData}</tbody>
        </table>
      </div>
    );
  }
}

export default SpreadsheetTable;
