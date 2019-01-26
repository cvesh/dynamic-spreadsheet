import React from 'react';
import EditableCell from 'Components/Spreadsheet/EditableCell';

class TableRow extends React.Component {
  render() {
    const { rowData, columnData, tableUpdate, validateCell, error } = this.props;
    return (
      <tr className="eachRow">
        <td>{rowData.id}</td>
          {
          columnData.map((column, index) =>
            <EditableCell
              key={`${column.columnTitle}_${rowData.id}`}
              tableUpdate={tableUpdate}
              validateCell={validateCell}
              error={error}
              cellData={{
                type: column.columnType,
                name: column.columnTitle.trim(),
                value: rowData[column.columnTitle.trim()],
                id: rowData.id,
                required: column.columnRequired
              }} 
            />
          )}
      </tr>
    );
  }
}

export default TableRow;