import "regenerator-runtime/runtime";
import React from "react";
import { render } from "react-dom";
import { createStore, applyMiddleware } from "redux";
import { Provider } from 'react-redux';
import rootReducer from './redux/root.reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import rootSaga from './redux/root.saga';
import TodosComponent from './components/todos/todos.container';
import './main.css';
// Create enhancement composers.
const composeEnhancers = composeWithDevTools({});
// Create the saga middleware.
const sagaMiddleware = createSagaMiddleware();
// Create the store with the root reducer + the redux devtools and our saga middleware.
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
// run the root saga, which combines the rest of them.
sagaMiddleware.run(rootSaga);

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
