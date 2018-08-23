import React, { Component } from 'react';
import '../css/Block.css';

class Block extends Component {
	constructor(props) {
    super(props);
    this.colorClasses = [
      '',
      'orange',
      'cyan',
      'red',
      'yellow',
      'magenta',
      'green',
      'amber'
    ]
  }

  shouldComponentUpdate(nextProps, nextState) {
    return nextProps.color !== Math.abs(this.props.color);
  }

  getColorClass(id) {
    return this.colorClasses[id];
  }

  render() {
    if (!this.props.color) {
      return (
        <div className="Block"></div>
      );
    } else {
      return (
        <div className={`Block ${this.getColorClass(Math.abs(this.props.color))}`}></div>
      );
    }
  }
}

export default Block;
