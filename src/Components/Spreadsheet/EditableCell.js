import React from 'react';

const EditableCell = props => (
  <td>
    <input 
      type='text'
      name={props.cellData.type}
      id={props.cellData.id}
      value={props.cellData.value} 
      onChange={props.tableUpdate} />
  </td>
);

export default EditableCell;
