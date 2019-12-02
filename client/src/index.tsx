import 'normalize.css/normalize.css';
import React from 'react';
import ReactDOM from 'react-dom';
import { register } from 'register-service-worker';
import App from './App';

ReactDOM.render(<App />, document.getElementById('root'));

register('/service-worker.js');
