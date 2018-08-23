import React, { Component } from 'react';
import Block from './Block';
import '../css/BlockMatrix.css';

class BlockMatrix extends Component {
	constructor(props) {
    super(props);

    // Block Matrix size
    this.size = {
      cols : 10,
      rows : 22
    };

    this.state = {
      matrix : this.buildMatrix(this.size.rows, this.size.cols),
      currentPosition : [0, 0],
    };

    this.pieces = this.getPieces();
  }
  
  drawBlock() {

  }

  buildMatrix (rows, cols) {
    let m = [];

    for (let i = 0; i < rows; i++) {
      m.push([]);
      for (let j = 0; j < cols; j++) {
        m[i].push(0);
      }
    };

    return m;
  }

  // (x, y) => (-y, x)
  getPieces() {
    // Pieces origin and rotation point: x = 0, y = 0
    return [
      [
        [-2, 0], [-1, 0], [0, 0], [0, 1]
      ],
      [
        [-1, -1],
        [-1, 0], [0, 0], [1, 0]
      ],
      [
                         [1, -1],
        [-1, 0], [0, 0], [1, 0]
      ],
      [
        [0, 0], [1, 0],
        [0, 1], [1, 1]
      ],
      [
                [0, -1], [1, -1],
        [-1, 0], [0, 0]
      ],
      [
                 [0, -1],
        [-1, 0], [0, 0], [1, 0]
      ],
      [
        [-1, -1],[0, -1],
                 [0, 0], [1, 0]
      ]
    ];
  }

  render() {
    return (
      <div className="BlockMatrix">
        {this.state.matrix.map((r, i) => r.map((b, j) => 
          <Block key={i * 10 + j} color={this.state.matrix[i][j]}/>
        ))}
      </div>
    );
  }
}

export default BlockMatrix;
