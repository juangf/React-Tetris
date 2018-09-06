import React, { Component } from 'react';
import '../css/CrossControl.css';

class Controls extends Component {
  constructor(props) {
    super(props);
    this.up    = this.up.bind(this);
    this.down  = this.down.bind(this);
    this.left  = this.left.bind(this);
    this.right = this.right.bind(this);
  }

  up() {
    if (this.props.onUp) {
      this.props.onUp();
    }
  }

  down() {
    if (this.props.onDown) {
      this.props.onDown();
    }
  }

  left() {
    if (this.props.onLeft) {
      this.props.onLeft();
    }
  }

  right() {
    if (this.props.onRight) {
      this.props.onRight();
    }
  }

  render() {
    return (
      <div className="CrossControl">
        <div className="arrow up"    onClick={this.up}></div>
        <div className="arrow down"  onClick={this.down}></div>
        <div className="arrow left"  onClick={this.left}></div>
        <div className="arrow right" onClick={this.right}></div>
      </div>
    );
  }
}

export default Controls;
