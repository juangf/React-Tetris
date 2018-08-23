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

    this.matrix = this.buildMatrix(this.size.rows, this.size.cols);
    this.state = {
      matrix  : this.matrix
    };

    this.lastPos = [5, 1];
    this.pos     = [5 , 1];
    this.piece   = this.getRandomInt(0, 5);
    this.color   = this.getRandomInt(1, 7);

    this.pieces = this.getPieces();
  }

  componentDidMount() {
    /*
      this.state.matrix[6][7] = 3;
      this.state.matrix[4][7] = 1;
      this.forceUpdate();
    */
    setInterval(() => {
      this.lastPos[0] = this.pos[0];
      this.lastPos[1] = this.pos[1];

      if (this.pieceCanGoDown()) {
        this.pos[1]++;
        this.clearPiece()
        this.drawPiece();
        this.update();
      } else {
        this.freezePiece();
        this.lastPos = [5, 1];
        this.pos     = [5 , 1];
        this.piece   = this.getRandomInt(0, 5);
        this.color   = this.getRandomInt(1, 7);
      }
    }, 700);
  }
  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  pieceCanGoDown() {
    return !this.pieces[this.piece].find((coord) => {
      let y = coord[1] + this.pos[1] + 1;
      
      return y >= this.size.rows || this.matrix[y][this.pos[0] + coord[0]] < 0;
    });
  }

  clearPiece() {
    this.pieces[this.piece].map((coord) => {
      this.matrix[this.lastPos[1] + coord[1]][this.lastPos[0] + coord[0]] = 0;
    });
  }

  drawPiece() {
    this.pieces[this.piece].map((coord) => {
      this.matrix[this.pos[1] + coord[1]][this.pos[0] + coord[0]] = this.color;
    });
  }

  freezePiece() {
    this.pieces[this.piece].map((coord) => {
      this.matrix[this.pos[1] + coord[1]][this.pos[0] + coord[0]] = -this.color;
    });
  }

  update() {
    this.setState({matrix: this.matrix});
  }

  buildMatrix(rows, cols) {
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
        [-2, 0], [-1, 0], [0, 0], [1, 0]
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
