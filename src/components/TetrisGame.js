import React, { Component } from 'react';
import '../css/TetrisGame.css';
import { buildMatrix, getRandomInt, getPiece } from '../helpers.js';
import BlockMatrix from './BlockMatrix';
import BlockInfo from './BlockInfo';
import CrossControl from './CrossControl';
import CircleButton from './CircleButton';

class TetrisGame extends Component {
	constructor(props) {
    super(props);

    this.lastPos = [5, -1];
    this.pos     = [5 , -1];
    this.matrix  = buildMatrix(this.props.rows, this.props.cols);
    this.state   = {
        matrix : buildMatrix(this.props.rows, this.props.cols),
        blinkingLines : [],
        ended  : false,
        paused : false,
        totalLines : 0,
        points : 0,
        level : 0,
        pieceType : getRandomInt(0, 5),
        nextPieceType : getRandomInt(0, 5)
    }

    this.piece = getPiece(this.state.pieceType);
    this.color = this.state.pieceType + 1;

    this.moveLeft     = this.moveLeft.bind(this);
    this.moveLeftEnd  = this.moveLeftEnd.bind(this);
    this.moveRight    = this.moveRight.bind(this);
    this.moveRightEnd = this.moveRightEnd.bind(this);
    this.moveDown     = this.moveDown.bind(this);
    this.moveDownEnd  = this.moveDownEnd.bind(this);

    this.gameLoop     = this.gameLoop.bind(this);
    this.getSpeed     = this.getSpeed.bind(this);

    this.pushDown     = false;
  }

  componentDidMount() {
    this.gameLoop();
  }
  

  fillScreen() {
    let y = this.props.rows - 1;

    var fillScreenFn = () => {
      for (let x = 0; x < this.props.cols; x++) {
        this.matrix[y][x] = -3;
      }

      this.updateMatrix();

      if (--y >= 0) {
        setTimeout(fillScreenFn, 20);
      }
    };

    fillScreenFn();
  }

  getSpeed() {
    return this.pushDown ? 30 : parseInt(400 / (this.state.level/2 + 1), 10);
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
        this.setState({
          pieceType : this.state.nextPieceType,
          nextPieceType: getRandomInt(0, 5)
        });
        this.piece   = getPiece(this.state.pieceType);
        this.color   = this.state.pieceType + 1;
  
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
          level : this.calcLevel(points)
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
          level : this.calcLevel(points)
        });
        preparePieceFn();
      }
    }
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
      default:
    }
    return 0;
  }

  calcLevel(points) {
    return parseInt(points / 5000, 10);
  }

  clearLines(lines) {
    lines.forEach((y) => {
      for (let x = 0; x < this.props.cols; x++) {
        this.matrix[y][x] = 0;
      }
    });
  }

  checkLines(piece, y) {
    let lines        = [];
    let revisedLines = [];
    let numCols      = parseInt(this.props.cols, 10);
    
    piece.forEach((coord) => {
      let colCount = 0;
      let ny = coord[1] + y;

      if (ny < 0 || revisedLines.indexOf(ny) > -1) {
        return;
      }

      revisedLines.push(ny);

      for (let x = 0; x < numCols; x++) {
        if (this.matrix[ny][x] === 0) {
          break;
        }
        colCount++;
      }
      if (colCount === numCols) {
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

  updateMatrix() {
    this.setState({matrix: this.matrix});
  }

  turnPiece(direction) {
    let turnedPiece = JSON.parse(JSON.stringify(this.piece));
    
    turnedPiece.forEach((coord) => {
        if (direction > 0) {
          let x = coord[0];
          coord[0] = -coord[1];
          coord[1] = x;
        } else {
          let y = coord[1];
          coord[1] = -coord[0];
          coord[0] = y;
        }
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
    if (this.pushDown) return;
    this.pushDown = true;
  }

  moveDownEnd() {
    if (!this.pushDown) return;

    if (this.pieceCanGoDown(this.piece)) {
      this.clearPiece(this.piece, this.pos[0], this.pos[1]);
      this.pos[1]++;
      this.drawPiece(this.piece, this.pos[0], this.pos[1], this.color);
      this.updateMatrix();
    }

    this.pushDown = false;
  }

  render() {
    let bmWidth  = window.innerWidth * 0.6;
    let bmHeight = window.innerWidth * 0.6 * 2;

    return (
      <div className="TetrisGame">
        <BlockMatrix height={bmHeight}
                     width={bmWidth}
                     cols={this.props.cols}
                     rows={this.props.rows}
                     matrix={this.state.matrix}
                     blinkingLines={this.state.blinkingLines}
        />
        <BlockInfo widthPerc="0.4"
                   heightPerc="0.2"
                   lines={this.state.totalLines}
                   level={this.state.level}
                   points={this.state.points}
                   pieceType={this.state.nextPieceType}
        />
        <CrossControl top={bmHeight}
                      onUp={this.turnPiece.bind(this, 1)}
                      onDown={this.moveDown}
                      onDownEnd={this.moveDownEnd}
                      onLeft={this.moveLeft}
                      onLeftEnd={this.moveLeftEnd}
                      onRight={this.moveRight}
                      onRightEnd={this.moveRightEnd}
                      repetition="true"
        />
        <CircleButton title="A"
                      class="a"
                      top={bmHeight}
                      onPress={this.turnPiece.bind(this, 1)}
                      repetition="true"
        />
        <CircleButton title="B"
                      class="b"
                      top={bmHeight}
                      onPress={this.turnPiece.bind(this, -1)}
                      repetition="true"
        />
      </div>
    );
  }
}

export default TetrisGame;
