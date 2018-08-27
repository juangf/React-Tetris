import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import TetrisGame from './components/TetrisGame';

ReactDOM.render(<TetrisGame rows="22" cols="10" />, document.getElementById('root'));