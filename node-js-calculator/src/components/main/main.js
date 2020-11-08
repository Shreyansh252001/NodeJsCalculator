'use strict';

import React from 'react';
import ReactDOM from 'react-dom';
import Calculator from '../calculator/calculator.js';

require('./main.scss');

ReactDOM.render(
  <Calculator />,
  document.getElementById('root')
);
