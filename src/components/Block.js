import React, { Component } from 'react';
import '../css/Block.css';

class Block extends Component {
	constructor(props) {
    super(props);
    this.state = {
      empty: true
    }
  }

  render() {
    if (this.state.empty) {
      return (
        <div className="Block"></div>
      );
    } else {
      return (
        <div className={`Block ${this.props.color}`}></div>
      );
    }
  }
}

export default Block;
