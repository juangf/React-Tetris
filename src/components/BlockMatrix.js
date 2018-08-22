import React, { Component } from 'react';
import Block from './Block';
import '../css/BlockMatrix.css';

class BlockMatrix extends Component {
  render() {
    let size = 10 * 22;
    return (
      <div className="BlockMatrix">
        {[...Array(size)].map((x, i) =>
          <Block />
        )}
      </div>
    );
  }
}

export default BlockMatrix;
