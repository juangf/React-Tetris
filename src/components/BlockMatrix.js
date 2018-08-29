import React, { Component } from 'react';
import Block from './Block';
import '../css/BlockMatrix.css';

class BlockMatrix extends Component {
  render() {
    return (
      <div className="BlockMatrix">
        {this.props.matrix.map((r, i) => r.map((b, j) => 
          <Block key={i * 10 + j} color={this.props.matrix[i][j]}/>
        ))}
      </div>
    );
  }
}

export default BlockMatrix;
