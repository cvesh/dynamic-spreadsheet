
// Single table cell

import React from 'react';

const EditableCell = props => (
  <td>
    <input 
      type='text'
      name={props.cellData.name}
      id={props.cellData.id}
      value={props.cellData.value} 
      onChange={props.tableUpdate}
      required={props.cellData.required}
      onBlur={e => props.validateCell(e, props.cellData.type)} 
      className='cell-input'
      />
  </td>
);

export default EditableCell;
