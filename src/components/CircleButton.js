import React, { Component } from 'react';
import '../css/CircleButton.css';

class CircleButton extends Component {
  constructor(props) {
    super(props);
    this.onPress         = this.onPress.bind(this);
    this.onPressEnd      = this.onPressEnd.bind(this);
    this.setRepetition   = this.setRepetition.bind(this);
    this.clearRepetition = this.clearRepetition.bind(this);
    this.repetition      = !!this.props.repetition;
    this.repetitionData  = {
        waitInt    : 0,
        waitTime   : 250,
        repeatInt  : 0,
        repeatTime : 100
    };
  }

  onPress() {
    if (this.props.onPress) {
      this.props.onPress();
      if (this.repetition) {
        this.setRepetition(this.props.onPress);
      }
    }
  }

  onPressEnd() {
    if (this.repetition) {
      this.clearRepetition();
    }
    if (this.props.onPressEnd) {
      this.props.onPressEnd();
    }
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

  render() {
    return (
      <div className={`CircleButton ${this.props.class}`}
           style={{top:this.props.top}}
           onTouchStart={this.onPress}
           onTouchEnd={this.onPressEnd}
      >{this.props.title}</div>
    );
  }
}

export default CircleButton;
