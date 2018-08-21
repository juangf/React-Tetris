import React, { Component } from 'react';
import Block from './Block';

class BlockMatrix extends Component {
  render() {
    return (
      <div>
        <Block color="red" />
        <Block color="blue" />
        <Block color="green" />
        <Block color="orange" />
      </div>
    );
  }
}

export default BlockMatrix;
