import React, { Component } from 'react';
import '../css/Info.css';
import { buildMatrix, getPiece } from '../helpers.js';
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
    let matrix = null;

    if (this.props.isPiece) {
      let piece = getPiece(this.props.value);
      matrix = buildMatrix(5, 5);

      piece.forEach((coord) => {
        let y = coord[1] + 2;
        let x = coord[0] + 2;
  
        matrix[y][x] = this.props.value + 1;
      });
      
    } else {
      matrix = buildMatrix(5, 5);
    }

    return (
      <div className="Info" style={{'height':height + 'px', 'width':width + 'px'}} >
        <div className="wrapper">
          <div className="title">{this.props.title}</div>
          {this.props.isPiece ? 
          <BlockMatrix height="60"
                       width="60"
                       cols="5"
                       rows="5"
                       matrix={matrix}
                       blinkingLines=""
          /> :
          <div className="value">{this.props.value}</div>}
        </div>
      </div>
    );
  }
}

export default Info;
