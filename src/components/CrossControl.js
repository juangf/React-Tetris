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

    this.setRepetition   = this.setRepetition.bind(this);
    this.clearRepetition = this.clearRepetition.bind(this);
    this.repetition      = !!this.props.repetition;
    this.repetitionData  = {
        waitInt    : 0,
        waitTime   : 250,
        repeatInt  : 0,
        repeatTime : 200
    };
  }

  setRepetition(fn) {
    this.repetitionData.waitInt = setTimeout(() => {
      this.repetitionData.repeatInt = setInterval(fn, this.repetitionData.repeatTime);
    }, this.repetitionData.waitTime);
  }

  clearRepetition() {
    clearTimeout(this.repetitionData.waitInt);
    clearInterval(this.repetitionData.repeatInt); 
  }

  onUp() {
    if (this.props.onUp) {
      this.props.onUp();
      if (this.repetition) {
        this.setRepetition(this.props.onUp);
      }
    }
  }

  onUpEnd() {
    if (this.repetition) {
      this.clearRepetition();
    }
    if (this.props.onUpEnd) {
      this.props.onUpEnd();
    }
  }

  onDown() {
    if (this.props.onDown) {
      this.props.onDown();
      if (this.repetition) {
        this.setRepetition(this.props.onDown);
      }
    }
  }

  onDownEnd() {
    if (this.repetition) {
      this.clearRepetition();
    }
    if (this.props.onDownEnd) {
      this.props.onDownEnd();
    }
  }

  onLeft() {
    if (this.props.onLeft) {
      this.props.onLeft();
      if (this.repetition) {
        this.setRepetition(this.props.onLeft);
      }
    }
  }

  onLeftEnd() {
    if (this.repetition) {
      this.clearRepetition();
    }
    if (this.props.onLeftEnd) {
      this.props.onLeftEnd();
    }
  }

  onRight() {
    if (this.props.onRight) {
      this.props.onRight();
      if (this.repetition) {
        this.setRepetition(this.props.onRight);
      }
    }
  }

  onRightEnd() {
    if (this.repetition) {
      this.clearRepetition();
    }
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
