import React from 'react';
import ReactDOM from 'react-dom';
import routes from './routes/route';
import { Provider } from 'react-redux';
import store from './store/index';

ReactDOM.render(
  <Provider store={store}>{routes}</Provider>,
  document.getElementById('root')
);

