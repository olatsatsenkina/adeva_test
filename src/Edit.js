import React from 'react';

export default class Edit extends React.Component {
  constructor(props) {
    super(props);
    //this "magic" is required because localStorage uses commas to separate array's values
    let value = this.props.text && this.props.text.replace(/&#44;/g, ",");
    this.state = {
      value: value
    }
    this.onSave = this.onSave.bind(this);
  }

  changeHandler(el){
    let value = el.currentTarget.value;
    this.setState({value: value});
  }

  componentWillReceiveProps(props) {
    //this "magic" is required because localStorage uses commas to separate array's values
    let value = props.text && props.text.replace(/&#44;/g, ",")
    this.setState({value: props.text})
  }

  onSave() {
    this.props.onSave(this.state.value);
  }

  onDelete() {
    this.props.onDelete();
  }

  render() {
    let {mode} = this.props;
    let title = (mode == 'add') ? 'Add note' : 'Edit your note';
    let deleteCancel = (mode == 'add') ? 'Cancel' : 'Delete';
    let addSave = (mode == 'add') ? 'Add' : 'Save';
    return (
      <div className="dashboard">
        <h2>{ title }</h2>
        <div className="notes-contents">
            <a href="#" className="delete-note" onClick={this.onDelete.bind(this)}>{deleteCancel}</a>
            <textarea
              onChange={this.changeHandler.bind(this)}
              placeholder="Note's text"
              className="note-text md-ish"
              value={this.state.value}>
            </textarea>
            <button onClick={this.onSave.bind(this)} className="save-note md-ish hover-cursor">{addSave}</button>
        </div>
      </div>
    )
  }
}
