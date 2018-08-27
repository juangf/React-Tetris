import React, { Component } from 'react';
import '../css/Controls.css';

class Controls extends Component {
	constructor(props) {
    super(props);
  }

  turnPiece() {
    alert('turn');
  }

  render() {
    return (
      <div className="Controls">
        <button onClick={this.turnPiece}>Turn</button>
      </div>
    );
  }
}

export default Controls;
