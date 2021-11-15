import { createStore, StoreEnhancer } from 'redux';
import reducers from '../state/reducers';

type WindowWithDevTools = Window & {
  __REDUX_DEVTOOLS_EXTENSION__: () => StoreEnhancer<unknown, {}>;
};

const isReduxDevtoolsExtenstionExist = (
  arg: Window | WindowWithDevTools
): arg is WindowWithDevTools => {
  return '__REDUX_DEVTOOLS_EXTENSION__' in arg;
};

export const store = createStore(
  reducers,
  {},
  isReduxDevtoolsExtenstionExist(window)
    ? window.__REDUX_DEVTOOLS_EXTENSION__()
    : undefined
);
