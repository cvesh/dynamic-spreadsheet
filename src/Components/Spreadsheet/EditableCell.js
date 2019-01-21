import React from 'react';

const EditableCell = props => (
  <td>
    <input 
      type={props.cellData.type}
      name={props.cellData.name}
      id={props.cellData.id}
      value={props.cellData.value} 
      onChange={props.tableUpdate} />
  </td>
);

export default EditableCell;
