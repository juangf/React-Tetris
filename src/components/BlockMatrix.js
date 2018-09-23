import React, { Component } from 'react';
import Block from './Block';
import '../css/BlockMatrix.css';

class BlockMatrix extends Component {
  render() {
    return (
      <div className="BlockMatrix" style={{'height':this.props.height + 'px', 'width':this.props.width + 'px'}}>
        {this.props.matrix.map((r, i) => r.map((b, j) => 
          <Block width={this.props.width / this.props.cols}
                 height={this.props.height / this.props.rows}
                 key={i * 10 + j}
                 color={this.props.matrix[i][j]}
                 blink={this.props.blinkingLines.indexOf(i) !== -1}
          />
        ))}
      </div>
    );
  }
}

export default BlockMatrix;
