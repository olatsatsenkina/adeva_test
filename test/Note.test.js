import React from 'react';
import Note from '../src/Note.js';
import renderer from 'react-test-renderer';

it('Note renders correctly', () => {
  const tree = renderer
    .create(<Note
      text = "Test Note"
      index="0"/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

let handler = (index, mode) => {
  expect(index).toBe("0");
  expect(mode).toBe("edit");
}

test('OnClick handler is working', () => {
  const noteComponent = renderer.create(<Note text="Test" handler={handler} index="0"/>);
  const rootInstance = noteComponent.root;
  const li = rootInstance.findByType("li");
  li.props.onClick();
});
