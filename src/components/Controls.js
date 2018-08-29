import React, { Component } from 'react';
import '../css/Controls.css';

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
      <div className="Controls">
        <button onClick={this.turnPiece}>Turn</button>
        <button onClick={this.moveLeft}>Left</button>
        <button onClick={this.moveRight}>Right</button>
      </div>
    );
  }
}

export default Controls;
