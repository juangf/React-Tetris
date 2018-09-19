import React, { Component } from 'react';
import '../css/BlockInfo.css';
import Info from './Info';

class BlockInfo extends Component {
	constructor(props) {
    super(props);
  }

  render() {
    let width  = window.innerWidth * this.props.widthPerc;

    return (
      <div className="BlockInfo" style={{'width':width}} >
        <Info title="Score" value={this.props.points} />
        <Info title="Lines" value={this.props.lines} />
        <Info title="Level" value={this.props.level} />
      </div>
    );
  }
}

export default BlockInfo;
