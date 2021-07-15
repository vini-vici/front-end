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
import Footer from './components/footer/footer.component';

import ErrorBoundary from './components/errorBoundary.component';

// Create enhancement composers.
const composeEnhancers = composeWithDevTools({
  shouldRecordChanges: import.meta.env !== 'production',
  actionSanitizer: a =>  a
});

// Create the saga middleware.
const sagaMiddleware = createSagaMiddleware({});

// Create the store with the root reducer + the redux devtools and our saga middleware.
const store = createStore(
  rootReducer,
  composeEnhancers(applyMiddleware(sagaMiddleware))
);
// run the root saga, which combines the rest of them.
sagaMiddleware.run(rootSaga);



function AppComponent() {
  return (
    <ErrorBoundary>
      <Provider
        store={store}
      > 
        <React.Suspense fallback={<Loading />}>
          <Router>
            <Navbar />
            <Switch>
              <Route path="/" exact component={React.lazy(() => import(/* webpackChunkName: "IndexRoute" */'./routes/index.route'))}/>
              <Route path="/callback" exact component={React.lazy(() => import('./routes/callback.route'))} />
              <Route path="/about" exact component={React.lazy(() => import('./routes/about.route'))} />
              {/* TODO: Add more routes. */}
            </Switch>
          </Router>
          <Footer />
        </React.Suspense>
      </Provider>
    </ErrorBoundary>
  );
}

export default hot(AppComponent);