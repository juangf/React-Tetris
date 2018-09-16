import React, { Component } from 'react';
import '../css/TetrisGame.css';
import BlockMatrix from './BlockMatrix';
import BlockInfo from './BlockInfo';
import CrossControl from './CrossControl';

class TetrisGame extends Component {
	constructor(props) {
    super(props);

    this.lastPos = [5, -1];
    this.pos     = [5 , -1];
    this.piece   = this.getPiece(this.getRandomInt(0, 5));
    this.color   = this.getRandomInt(1, 6);
    this.matrix  = this.buildMatrix(this.props.rows, this.props.cols);
    this.state   = {
        matrix : this.buildMatrix(this.props.rows, this.props.cols),
        blinkingLines : [],
        ended  : false,
        paused : false,
        totalLines : 0,
        points : 0,
        level : 0
    }

    this.turnPiece    = this.turnPiece.bind(this);
    this.moveLeft     = this.moveLeft.bind(this);
    this.moveLeftEnd  = this.moveLeftEnd.bind(this);
    this.moveRight    = this.moveRight.bind(this);
    this.moveRightEnd = this.moveRightEnd.bind(this);
    this.moveDown     = this.moveDown.bind(this);
    this.moveDownEnd  = this.moveDownEnd.bind(this);

    this.gameLoop     = this.gameLoop.bind(this);
    this.getSpeed     = this.getSpeed.bind(this);

    this.pointsToUpdateLevel = 1000;
  }

  componentDidMount() {
    this.gameLoop();
  }
  

  fillScreen() {
    let y = this.props.rows - 1;

    var fillScreenFn = () => {
      for (let x = 0; x < this.props.cols; x++) {
        this.matrix[y][x] = 3;
      }

      this.updateMatrix();

      if (--y >= 0) {
        setTimeout(fillScreenFn, 20);
      }
    };

    fillScreenFn();
  }

  getSpeed() {
    return parseInt(400 / (this.state.level/2 + 1));
  }

  gameLoop() {
    this.lastPos[0] = this.pos[0];
    this.lastPos[1] = this.pos[1];

    if (this.pieceCanGoDown(this.piece)) {
      this.pos[1]++;
      this.clearPiece(this.piece, this.lastPos[0], this.lastPos[1]);
      this.drawPiece(this.piece, this.pos[0], this.pos[1], this.color);
      this.updateMatrix();
      setTimeout(this.gameLoop, this.getSpeed());
    } else {
      this.freezePiece(this.piece);
      
      let lines = this.checkLines(this.piece, this.pos[1]);

      let preparePieceFn = () => {
        this.lastPos = [5, -1];
        this.pos     = [5 , -1];
        this.piece   = this.getPiece(this.getRandomInt(0, 5));
        this.color   = this.getRandomInt(1, 6);
  
        if (this.pieceCanGoDown(this.piece)) {
          setTimeout(this.gameLoop, this.getSpeed());
        } else {
          this.fillScreen();
          this.setState({ended : true});
        }
      };

      let points = this.state.points + this.pos[1];

      if (lines.length) {
        points += this.getPointsPerLines(lines.length, this.state.level);
        
        this.setState({
          blinkingLines : lines,
          totalLines : this.state.totalLines + lines.length,
          points : points,
          level : parseInt(points / this.pointsToUpdateLevel)
        });

        setTimeout(() => {
          this.setState({blinkingLines : []});
          this.clearLines(lines);
          this.displaceDownMatrix(lines);
          this.updateMatrix();
          preparePieceFn();
        }, 800);
      } else {
        this.setState({
          points : points,
          level : parseInt(points / this.pointsToUpdateLevel)
        });
        preparePieceFn();
      }
    }
  }

  getRandomInt(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  displaceDownMatrix(lines) {
    lines.forEach((y) => {
      do {
        for (let x = 0; x < this.props.cols; x++) {
          this.matrix[y][x] = this.matrix[y - 1][x];
        }
      } while (y-- > 1);

      for (let x = 0; x < this.props.cols; x++) {
        this.matrix[y][x] = 0;
      }
    });
  }

  getPointsPerLines(numLines, level) {
    // Original Nintendo Scoring System
    // https://tetris.wiki/Scoring
    switch (numLines) {
      case 1 :
        return 40 * (level + 1);
      case 2 :
        return 100 * (level + 1);
      case 3 :
        return 300 * (level + 1);
      case 4 :
        return 1200 * (level + 1);
    }
    return 0;
  }

  clearLines(lines) {
    lines.forEach((y) => {
      for (let x = 0; x < this.props.cols; x++) {
        this.matrix[y][x] = 0;
      }
    });
  }

  checkLines(piece, y) {
    let lines = [];
    let revisedLines = [];
    
    piece.forEach((coord) => {
      let colCount = 0;
      let ny = coord[1] + y;

      if (ny < 0 || revisedLines.indexOf(ny) > -1) {
        return;
      }

      revisedLines.push(ny);

      for (let x = 0; x < this.props.cols; x++) {
        if (this.matrix[ny][x] === 0) {
          break;
        }
        colCount++;
      }
      if (colCount == this.props.cols) {
        lines.push(ny);
      }
    });
    return lines;
  }

  pieceCanGoDown(piece) {
    return !piece.find((coord) => {
      return coord[1] + this.pos[1] + 1 > 0 && !this.isValidPosition(coord[0] + this.pos[0], coord[1] + this.pos[1] + 1);
    });
  }

  pieceCanGoLeft(piece) {
    return !piece.find((coord) => {
      return !this.isValidPosition(coord[0] + this.pos[0] - 1, coord[1] + this.pos[1]);
    });
  }

  pieceCanGoRight(piece) {
    return !piece.find((coord) => {
      return !this.isValidPosition(coord[0] + this.pos[0] + 1, coord[1] + this.pos[1]);
    });
  }

  pieceCanRotate(piece) {
    return !piece.find((coord) => {      
      return !this.isValidPosition(coord[0] + this.pos[0], coord[1] + this.pos[1]);
    });
  }

  clearPiece(piece, x, y) {
    piece.forEach((coord) => {
      let ny = coord[1] + y;
      let nx = coord[0] + x;
      
      if (this.isValidPosition(nx, ny)) {
        this.matrix[ny][nx] = 0;
      }
    });
  }

  isValidPosition(x, y) {
    return x >= 0 && 
           x < this.props.cols &&
           y >= 0 &&
           y < this.props.rows &&
           this.matrix[y][x] >= 0;
  }

  drawPiece(piece, x, y, color) {
    piece.forEach((coord) => {
      let nx = x + coord[0];
      let ny = y + coord[1];

      if (this.isValidPosition(nx, ny)) {
        this.matrix[ny][nx] = color;
      }
    });
  }

  freezePiece(piece) {
    piece.forEach((coord) => {
      let y = this.pos[1] + coord[1];
      let x = this.pos[0] + coord[0];

      if (this.isValidPosition(x, y)) {
        this.matrix[y][x] = -this.color;
      }
    });
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

  updateMatrix() {
    this.setState({matrix: this.matrix});
  }

  getPiece(id) {
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
    ][id];
  }

  turnPiece() {
    let turnedPiece = JSON.parse(JSON.stringify(this.piece));
    
    turnedPiece.forEach((coord) => {
        let x = coord[0];
        coord[0] = -coord[1];
        coord[1] = x;
    });
    
    if (this.pieceCanRotate(turnedPiece)) {
        this.clearPiece(this.piece, this.pos[0], this.pos[1]);
        this.piece = turnedPiece;
        this.drawPiece(this.piece, this.pos[0], this.pos[1], this.color);
        this.updateMatrix();
    }
  }

  moveLeft() {
    if (this.pieceCanGoLeft(this.piece)) {
      this.clearPiece(this.piece, this.pos[0], this.pos[1]);
      this.pos[0]--;
      this.drawPiece(this.piece, this.pos[0], this.pos[1], this.color);
      this.updateMatrix();
    }
  }

  moveLeftEnd() {
  }

  moveRight() {
    if (this.pieceCanGoRight(this.piece)) {
      this.clearPiece(this.piece, this.pos[0], this.pos[1]);
      this.pos[0]++;
      this.drawPiece(this.piece, this.pos[0], this.pos[1], this.color);
      this.updateMatrix();
    }
  }

  moveRightEnd() {
  }

  moveDown() {
    if (this.pieceCanGoDown(this.piece)) {
      this.clearPiece(this.piece, this.pos[0], this.pos[1]);
      this.pos[1]++;
      this.drawPiece(this.piece, this.pos[0], this.pos[1], this.color);
      this.updateMatrix();
    }
  }

  moveDownEnd() {

  }

  render() {
    return (
      <div className="TetrisGame">
        <BlockMatrix widthPerc="0.6"
                     matrix={this.state.matrix}
                     blinkingLines={this.state.blinkingLines}
        />
        <BlockInfo widthPerc="0.4"
                   heightPerc="0.2"
                   lines={this.state.totalLines}
                   level={this.state.level}
                   points={this.state.points}
        />
        <CrossControl onUp={this.turnPiece}
                      onDown={this.moveDown}
                      onDownEnd={this.moveDownEnd}
                      onLeft={this.moveLeft}
                      onLeftEnd={this.moveLeftEnd}
                      onRight={this.moveRight}
                      onRightEnd={this.moveRightEnd}
                      repetition="true"
        />
      </div>
    );
  }
}

export default TetrisGame;
