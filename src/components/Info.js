import React, { Component } from 'react';
import '../css/Info.css';
import { buildMatrix } from '../helpers.js';
import BlockMatrix from './BlockMatrix';

class Info extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      this.props.title === nextProps.title &&
      this.props.value === nextProps.value
    );
  }

  render() {
    let width  = window.innerWidth * this.props.widthPerc;
    let height = window.innerWidth * this.props.heightPerc;

    return (
      <div className="Info" style={{'height':height + 'px', 'width':width + 'px'}} >
        <div className="wrapper">
          <div className="title">{this.props.title}</div>
          <div className="value">{this.props.value}</div>
          {this.props.isPiece ? 
          <BlockMatrix height="60"
                       width="60"
                       cols="5"
                       rows="5"
                       matrix={buildMatrix(5, 5)}
                       blinkingLines=""
          /> : ''}
        </div>
      </div>
    );
  }
}

export default Info;
