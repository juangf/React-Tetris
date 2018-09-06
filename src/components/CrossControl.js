import React, { Component } from 'react';
import '../css/CrossControl.css';

class Controls extends Component {
  constructor(props) {
    super(props);
    this.onUp       = this.onUp.bind(this);
    this.onUpEnd    = this.onUpEnd.bind(this);
    this.onDown     = this.onDown.bind(this);
    this.onDownEnd  = this.onDownEnd.bind(this);
    this.onLeft     = this.onLeft.bind(this);
    this.onLeftEnd  = this.onLeftEnd.bind(this);
    this.onRight    = this.onRight.bind(this);
    this.onRightEnd = this.onRightEnd.bind(this);
  }

  onUp() {
    if (this.props.onUp) {
      this.props.onUp();
    }
  }

  onUpEnd() {
    if (this.props.onUpEnd) {
      this.props.onUpEnd();
    }
  }

  onDown() {
    if (this.props.onDown) {
      this.props.onDown();
    }
  }

  onDownEnd() {
    if (this.props.onDownEnd) {
      this.props.onDownEnd();
    }
  }

  onLeft() {
    if (this.props.onLeft) {
      this.props.onLeft();
    }
  }

  onLeftEnd() {
    if (this.props.onLeftEnd) {
      this.props.onLeftEnd();
    }
  }

  onRight() {
    if (this.props.onRight) {
      this.props.onRight();
    }
  }

  onRightEnd() {
    if (this.props.onRightEnd) {
      this.props.onRightEnd();
    }
  }

  render() {
    return (
      <div className="CrossControl">
        <div className="arrow up"    onTouchStart={this.onUp}    onTouchEnd={this.onUpEnd}></div>
        <div className="arrow down"  onTouchStart={this.onDown}  onTouchEnd={this.onDownEnd}></div>
        <div className="arrow left"  onTouchStart={this.onLeft}  onTouchEnd={this.onLeftEnd}></div>
        <div className="arrow right" onTouchStart={this.onRight} onTouchEnd={this.onRightEnd}></div>
      </div>
    );
  }
}

export default Controls;
