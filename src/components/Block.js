import React, { Component } from 'react';
import '../css/Block.css';

class Block extends Component {
	constructor(props) {
    super(props);
    console.log(props);
  }

  render() {
    return (
      <div className={`Block ${this.props.color}`}></div>
    );
  }
}

export default Block;
