import React, { Component } from 'react';
import Block from './Block';
import '../css/BlockMatrix.css';

class BlockMatrix extends Component {
	constructor(props) {
    super(props);

    this.state = {
      currentPosition : {
        x : 0,
        y : 0
      },
      pieces : []
    };

    this.pieces = this.getPieces();
  }

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
    let size = 10 * 22;
    return (
      <div className="BlockMatrix">
        {[...Array(size)].map((x, i) =>
          <Block key={i} />
        )}
      </div>
    );
  }
}

export default BlockMatrix;
