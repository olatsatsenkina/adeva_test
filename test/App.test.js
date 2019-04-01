import React from 'react';
import App from '../src/App.js';
import renderer from 'react-test-renderer';

it('App renders correctly', () => {
  const tree = renderer
    .create(<App/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

test('Main workflow test', () => {
  const appComponent = renderer.create(<App/>);
  const rootInstance = appComponent.root;
  const button = rootInstance.findByType("button");
  button.props.onClick();
  const tree = appComponent.toJSON();
  expect(tree).toMatchSnapshot();
  const textarea = rootInstance.findByType("textarea");
  let e = {currentTarget: {value: "Added note text"}};
  textarea.props.onChange(e);
  const addButton = rootInstance.findByProps({className: "save-note md-ish hover-cursor"});
  addButton.props.onClick();
  const treeAfterAdd = appComponent.toJSON();
  expect(treeAfterAdd).toMatchSnapshot();
});

test('Search workflow test', () => {
  const appComponent = renderer.create(<App/>);
  const rootInstance = appComponent.root;
  const searchNotes = rootInstance.findByProps({className: "search md-ish"});
  let e = {currentTarget: {value: "Some irrelevant text here"}}
  searchNotes.props.onChange(e);
  const tree = appComponent.toJSON();
  expect(tree).toMatchSnapshot();
  e = {currentTarget: {value: "Added note"}}
  searchNotes.props.onChange(e);
  const newTree = appComponent.toJSON();
  expect(newTree).toMatchSnapshot();
});

test('Delete note test', () => {
  const appComponent = renderer.create(<App/>);
  const rootInstance = appComponent.root;
  const note = rootInstance.findByType("li");
  note.props.onClick();
  const deleteLink = rootInstance.findByProps({className: "delete-note"});
  deleteLink.props.onClick();
  const tree = appComponent.toJSON();
  expect(tree).toMatchSnapshot();
});
