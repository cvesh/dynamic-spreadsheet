import React from 'react';
import * as localStore from 'Components/Generics/Localstore';

class ColumnForm extends React.Component {
  state = {
    columnTitle: '',
    columnType: 'Text',
    columnRequired: false,
  }

  handleCheckboxChange = () => {
    this.setState({ columnRequired: !this.state.columnRequired });
  }

  handleChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    this.setState({
      [name]: value
    });
  }

  handleSubmit = () => {
    let columnData = localStore.getColumnData('columnData');
    if(columnData === null)
      columnData = [];
    columnData.push(this.state);
    localStore.setColumnData(columnData);
  }

  render() {
    return (
      <div className=''>
        <div>
          <label>Column Title</label>
          <input
            type='text'
            name='columnTitle'
            onChange={this.handleChange} />
        </div>
        <div>
          <label>Column Type</label>
          <select name='columnType' onChange={this.handleChange}>
            <option value='Text'>Text</option>
            <option value='Number'>Number</option>
            <option value='Date'>Date</option>
          </select>
        </div>
        <div>
          <label>Is this field required?</label>
          <input
            type='checkbox'
            name='columnRequired'
            onChange={this.handleCheckboxChange} />
        </div>
        <button type='submit' onClick={this.handleSubmit}>Add Column</button>
      </div>
    );
  }
}

export default ColumnForm;
