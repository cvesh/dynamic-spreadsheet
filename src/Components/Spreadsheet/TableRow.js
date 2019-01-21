import React from 'react';
import EditableCell from 'Components/Spreadsheet/EditableCell';

class TableRow extends React.Component {
  onDelEvent = rowData => {
    this.props.onDelEvent(rowData);
  }

  render() {
    const { rowData, tableUpdate } = this.props;
    return (
      <tr className="eachRow">
        <EditableCell 
          tableUpdate={tableUpdate} 
          cellData={{
            type: 'text',
            name: 'name',
            value: rowData.name,
            id: rowData.id
          }} />
        <EditableCell 
          tableUpdate={tableUpdate}
          cellData={{
            type: 'number',
            name: 'qty',
            value: rowData.qty,
            id: rowData.id
          }} />
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