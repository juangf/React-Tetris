import React, { Component } from 'react';
import '../css/BlockInfo.css';
import Info from './Info';

class BlockInfo extends Component {

  shouldComponentUpdate(nextProps, nextState) {
    return !(
      this.props.points === nextProps.points &&
      this.props.lines === nextProps.lines &&
      this.props.level === nextProps.level &&
      this.props.pieceType === nextProps.pieceType
    );
  }

  render() {
    let width = window.innerWidth * this.props.widthPerc;
    return (
      <div className="BlockInfo" style={{'width':width}} >
        <Info title="Score" value={this.props.points} />
        <Info title="Lines" value={this.props.lines} />
        <Info title="Level" value={this.props.level} />
        <Info title="Next Piece" value={this.props.pieceType} isPiece="1" />
      </div>
    );
  }
}

export default BlockInfo;
