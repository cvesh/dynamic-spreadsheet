import React from 'react';
import EditableCell from 'Components/Spreadsheet/EditableCell';

class TableRow extends React.Component {
  onDelEvent = rowData => {
    this.props.onDelEvent(rowData);
  }

  render() {
    const { rowData, columnData, tableUpdate } = this.props;
    return (
      <tr className="eachRow">
        <td>{rowData.id}</td>
          {
          columnData.map((column, index) =>
            <EditableCell
              key={`${column.columnTitle}_${rowData.id}`}
              tableUpdate={tableUpdate} 
              cellData={{
              type: column.columnType,
              name: column.columnTitle.trim(),
              value: rowData[column.columnTitle.trim()],
              id: rowData.id
            }} />
          )}
        <td className="del-cell">
          <input 
            type="button"
            onClick={e => this.onDelEvent(rowData)} 
            value="X" 
            className="del-btn" />
        </td>
      </tr>
    );
  }
}

export default TableRow;