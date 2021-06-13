import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import rootReducer from './redux/root.reducer';
import { devToolsEnhancer } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import './main.css';

const sagaMiddleware = createSagaMiddleware();

const store = createStore(
  rootReducer,
  devToolsEnhancer({})
);

import TodosComponent from './components/todos/todos.container';

function AppComponent() {
  return (
    <Provider
      store={store}
    >
      <TodosComponent />
    </Provider>
  );
}

render(<AppComponent />, document.querySelector('#app'));
