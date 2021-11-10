import React from 'react';
import ReactDOM from 'react-dom';
import App from './App';
import './index.scss';
import { createStore } from 'redux';
import reducers from './reducers';
import { Provider } from 'react-redux';

const store = createStore(reducers);

store.subscribe(() => console.log(store.getState()));

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);
