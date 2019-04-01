import React from 'react';

export default class Note extends React.Component {

  handleClick(e) {
    let {index, handler} = this.props;
    handler(index, 'edit');
  }

  render() {
    let {text} = this.props;
    text = text.replace(/&#44;/g, ",");
    return (
        <li onClick={this.handleClick.bind(this)}>{text}</li>
    );
  }
}
