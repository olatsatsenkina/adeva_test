import React from 'react';
import Note from './Note.js';
import Edit from './Edit.js';

export default class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      mode: 'list',
      search: '',
      notes: []
    }
    this.changeMode = this.changeMode.bind(this);
    this.addNote = this.addNote.bind(this);
    this.saveNote = this.saveNote.bind(this);
    this.deleteNote = this.deleteNote.bind(this);
    this.cancelNote = this.cancelNote.bind(this);
  }

  componentWillMount() {
    let notes = this.fetchNotes();
    this.setState({notes: notes});
  }

  fetchNotes() {
    let notes = localStorage.getItem('notes');
    if (!notes)
      notes = [];
    else
      notes = notes.split(',');
    return notes;
  }

  changeMode(index, mode) {
    this.setState({mode: mode, selected: index});
  }

  addNote(text) {
    let {notes} = this.state;
    notes.push(this.replaceCommas(text));
    this.updateNotes(notes);
  }

  saveNote(text) {
    let {notes, selected} = this.state;
    notes[selected] = this.replaceCommas(text);
    this.updateNotes(notes);
  }

  deleteNote() {
    let {notes, selected} = this.state;
    notes.splice(selected, 1);
    this.updateNotes(notes);
  }

  cancelNote() {
    this.setState({mode: 'view'});
  }

  updateNotes(notes) {
    this.setState({notes: notes, mode: 'view', selected: null});
    localStorage.setItem('notes', notes);
  }

  replaceCommas(text) {
    return text.replace(/,/g,"&#44;");
  }

  searchNotes(el) {
    let searchString = el.currentTarget.value;
    this.setState({search: searchString})
  }

  render() {
    let {notes, mode, selected, search} = this.state;
    let selectedNote = notes[selected];
    let self = this;
    let noteList = notes.filter(
      x => x.indexOf(search) != -1
    ).map((el, index) =>
      (
        <Note
          handler={self.changeMode}
          text={el}
          key={"note" + index}
          index={index}/>
      )
    );
    let noNotesMessage = "No notes yet. Add some :)"
    if (notes.length) {
      noNotesMessage = "No such notes found :( "
    }
    return (
      <div className="container">
        <div className="sidebar">
          <h1>Notes</h1>
          <input
            type="search"
            value={search}
            onChange={this.searchNotes.bind(this)}
            placeholder="Search notes"
            className="search md-ish" />
          <ul>
            { noteList }
            { !noteList.length && <li className="no-notes">{noNotesMessage}</li>}
          </ul>
          <button
            className="add-button md-ish hover-cursor"
            onClick={this.changeMode.bind(this, null, 'add')}> Add Note</button>
        </div>
        { mode == 'edit' &&
          <Edit mode='edit'
            text={selectedNote}
            onSave={this.saveNote}
            onDelete={this.deleteNote}/>}
        { mode == 'add' &&
          <Edit mode='add'
            onSave={this.addNote}
            onDelete={this.cancelNote}/>}
      </div>
    );
  }
}
