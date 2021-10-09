import { hot } from 'react-hot-loader/root';
import React from 'react';
import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import rootReducer from './redux/root.reducer';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';

import rootSaga from './redux/root.saga';
import Loading from '@vini-vici/viddi/dist/loading/loading.component';
import Footer from '@/components/footer/footer.component';

import ErrorBoundary from './components/errorBoundary.component';
import Navbar from './components/navbar/navbar.component';

import { CognitoProvider } from '@/hooks/cognito';

// Create enhancement composers.
const composeEnhancers = composeWithDevTools({
  shouldRecordChanges: import.meta.env !== 'production',
  actionSanitizer: a => a
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
        <CognitoProvider>
          <Router>
            <Navbar />
            <React.Suspense fallback={<Loading />}>
              <Switch>
                <Route
                  path="/"
                  exact
                  component={
                    React.lazy(
                      () => import(/* webpackChunkName: "IndexRoute", webpackPreload: true */'./routes/index.route')
                    )
                  }
                />
                <Route
                  path="/callback"
                  exact
                  component={
                    React.lazy(
                      () => import(/* webpackChunkName: "CallbackRoute" */'./routes/callback.route')
                    )
                  }
                />
                <Route
                  path="/about"
                  exact
                  component={
                    React.lazy(
                      () => import(/* webpackChunkName: "AboutRoute"  */'./routes/about.route')
                    )
                  }
                />
                <Route
                  path="/logout"
                  exact
                  component={
                    React.lazy(
                      () => import(/* webpackChunkName: "LogoutRoute" */'./routes/logout.route')
                    )
                  }
                />
                <Route
                  path="/login"
                  exact
                  component={
                    React.lazy(
                      () => import(/* webpackChunkName: "LoginRoute" */'./routes/login.route')
                    )
                  }
                />
                <Route
                  path="/signup"
                  exact
                  component={
                    React.lazy(
                      () => import(/* webpackChunkName: "SignupRoute" */'./routes/signup.route')
                    )
                  }
                />
                <Route
                  path="/"
                  component={
                    React.lazy(
                      () => import(/* webpackChunkName: "404Route", webpackPrefetch: true */'./routes/_404')
                    )
                  }
                />
              </Switch>
            </React.Suspense>
            <Footer />
          </Router>
        </CognitoProvider>
      </Provider>
    </ErrorBoundary>
  );
}

export default AppComponent;