import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Block from './Block';
import registerServiceWorker from './registerServiceWorker';

ReactDOM.render(<Block />, document.getElementById('root'));
registerServiceWorker();
