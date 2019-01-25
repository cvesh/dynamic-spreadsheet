import React from 'react';
import * as localStore from 'Components/Generics/Localstore';

class ColumnForm extends React.Component {
  state = {
    id: 64,
    columnTitle: '',
    columnType: 'Text',
    columnRequired: false,
  }

  componentDidMount() {
    let columnData = localStore.getData('columnData');
    if(columnData && columnData.length !== 0)
      this.setState({ id: columnData[columnData.length -1].id});
  }

  handleCheckboxChange = () => {
    this.setState({ columnRequired: !this.state.columnRequired });
  }

  handleChange = e => {
    const target = e.target;
    const name = target.name;
    const value = target.value;
    let newColumnData = this.state;
    newColumnData[name] = value; 
    this.setState(newColumnData);
  }

  handleColumnSubmit = (e, id) => {
    e.preventDefault();
    const { appendColumnData } = this.props;
    let columnData = localStore.getData('columnData');
    if(columnData === null){
      columnData = [];
      id = 64;
    }
    let newColumnData = this.state
    newColumnData.id = id + 1;
    this.setState({ id: newColumnData.id })
    columnData.push(newColumnData);
    localStore.setData('columnData', columnData);
    console.log(columnData)
    appendColumnData(newColumnData.columnTitle);
  }

  

  render() {
    let { id } = this.state;
    console.log(this.props)
    return (
      <div className=''>
        <form onSubmit={e => this.handleColumnSubmit(e, id)}>
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
        <input type='submit' value='Add Column'/>
        </form>
      </div>
    );
  }
}

export default ColumnForm;
