import './index.scss';

import React, { Component } from 'react'

export default class TagDelete extends Component {

  onDelete = () =>{
    this.props.metodoDelete(this.props.tag);
  }

  render() {
    return (
      <div className="tag">{this.props.tag}<div onClick={this.onDelete} className="del-tag">X</div></div>
    )
  }
}
