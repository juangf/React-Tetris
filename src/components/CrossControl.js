import React, { Component } from 'react';
import '../css/CrossControl.css';

class Controls extends Component {
  constructor(props) {
    super(props);
    this.turnPiece = this.turnPiece.bind(this);
    this.moveLeft  = this.moveLeft.bind(this);
    this.moveRight = this.moveRight.bind(this);
  }

  turnPiece(e) {
    e.preventDefault();
    this.props.onTurn();
  }

  moveLeft(e) {
    e.preventDefault();
    this.props.onMoveLeft();
  }

  moveRight(e) {
    e.preventDefault();
    this.props.onMoveRight();
  }

  render() {
    return (
      <div className="CrossControl">
        <div className="arrow up"></div>
        <div className="arrow down"></div>
        <div className="arrow left"></div>
        <div className="arrow right"></div>
      </div>
    );
  }
}

export default Controls;
