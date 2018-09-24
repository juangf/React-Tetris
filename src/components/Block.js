import React, { Component } from 'react';
import '../css/Block.css';

class Block extends Component {
	constructor(props) {
    super(props);
    this.colorClasses = [
      '',
      'yellow',
      'cyan',
      'red',
      'orange',
      'magenta',
      'green',
      'amber'
    ];
  }

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      nextProps.blink === this.props.blink &&
      Math.abs(nextProps.color) === Math.abs(this.props.color)
    )
  }

  getColorClass(id) {
    return this.colorClasses[id];
  }

  render() {
    if (!this.props.color) {
      return (
        <div style={{width:this.props.width, height:this.props.height}} className={`Block${this.props.blink ? ' blink' : ''}`}></div>
      );
    } else {
      return (
        <div style={{width:this.props.width, height:this.props.height}} className={`Block ${this.getColorClass(Math.abs(this.props.color))}${this.props.blink ? ' blink' : ''}`}></div>
      );
    }
  }
}

export default Block;
