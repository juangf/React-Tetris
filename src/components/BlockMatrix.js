import React, { Component } from 'react';
import Block from './Block';
import '../css/BlockMatrix.css';

class BlockMatrix extends Component {
  constructor(props) {
    super(props);
  }
  render() {
    let width  = window.innerWidth * this.props.widthPerc;
    let height = window.innerWidth * this.props.widthPerc * 2;

    return (
      <div className="BlockMatrix" style={{'height':height + 'px', 'width':width + 'px'}}>
        {this.props.matrix.map((r, i) => r.map((b, j) => 
          <Block key={i * 10 + j} color={this.props.matrix[i][j]} blink={this.props.blinkingRows.indexOf(i) !== -1}/>
        ))}
      </div>
    );
  }
}

export default BlockMatrix;
