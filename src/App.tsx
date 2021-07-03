import { hot } from 'react-hot-loader/root';
import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import rootReducer from './redux/root.reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './redux/root.saga';
import Loading from './components/loading/loading.component';
import Navbar from './components/navbar/navbar.component';

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
      <React.Suspense fallback={<Loading />}>
        <Router>
          <Navbar />
          <Switch>
            <Route path="/" exact component={React.lazy(() => import(/* webpackChunkName: "IndexRoute" */'./routes/index.route'))}/>
            {/* TODO: Add more routes. */}
          </Switch>
        </Router>      
      </React.Suspense>
    </Provider>
  );
}

export default hot(AppComponent);