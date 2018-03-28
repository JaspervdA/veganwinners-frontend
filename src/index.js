import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter } from 'react-router-dom'
import 'grommet/scss/vanilla/index.scss';
import App from './App';

const element = document.getElementById('root');

ReactDOM.render((
  <BrowserRouter>
    <App />
  </BrowserRouter>
), element);
