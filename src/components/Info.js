import React, { Component } from 'react';
import '../css/Info.css';

class Info extends Component {
	constructor(props) {
    super(props);
  }

  render() {
    let width  = window.innerWidth * this.props.widthPerc;
    let height = window.innerWidth * this.props.heightPerc;
    return (
      <div className="Info" style={{'height':height + 'px', 'width':width + 'px'}} >
        <div className="wrapper">
          <div className="title">{this.props.title}</div>
          <div className="value">{this.props.value}</div>
        </div>
      </div>
    );
  }
}

export default Info;
