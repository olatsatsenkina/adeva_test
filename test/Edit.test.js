import React from 'react';
import Edit from '../src/Edit.js';
import renderer from 'react-test-renderer';

it('Edit interface renders correctly', () => {
  const tree = renderer
    .create(<Edit
      mode="edit"
      text="Some test text here"/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('Add interface renders correctly', () => {
  const tree = renderer
    .create(<Edit
      mode="add"
      text=""/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});


let saveNoteHandler = (value) => {
  expect(value).toBe("Some text here");
}

let deleteNoteHandler = () => {
  expect(true).toBe(true);
}

test('Save in edit mode is working', () => {
  const editComponent = renderer.create(<Edit mode='edit'
    text="Some text here"
    onSave={saveNoteHandler}/>);
  const rootInstance = editComponent.root;
  const button = rootInstance.findByType("button");
  button.props.onClick();
});

test('Delete note in edit mode is working', () => {
  const editComponent = renderer.create(<Edit mode='edit'
    text="Some text here"
    onDelete={deleteNoteHandler}/>);
  const rootInstance = editComponent.root;
  const link = rootInstance.findByType("a");
  link.props.onClick();
});

let saveNoteHandlerUpdate = (value) => {
  expect(value).toBe("Updated note");
}

test('Change contents of the texarea is ok', () => {
  const editComponent = renderer.create(<Edit mode='edit'
    onSave={saveNoteHandlerUpdate}
    text="Some text here" />);
  const rootInstance = editComponent.root;
  const textarea = rootInstance.findByType("textarea");
  let e = {currentTarget: {value: "Updated note"}}
  textarea.props.onChange(e);
  const button = rootInstance.findByType("button");
  button.props.onClick();
});
