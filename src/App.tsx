import React from 'react';
import { createStore, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import Loading from '@vini-vici/viddi/dist/loading/loading.component';
import Footer from '@/components/footer/footer.component';

import ErrorBoundary from './components/errorBoundary.component';
import Navbar from './components/navbar/navbar.component';

import { CognitoProvider } from '@/hooks/cognito';

import store from '@/redux/store';

function AppComponent(): React.ReactElement {
  return (
    <ErrorBoundary>
      <Provider
        store={store}
      >
        <CognitoProvider>
          <Router>
            <Navbar />
            <React.Suspense fallback={
              <div style={{flexGrow: 1, textAlign: 'center'}}>
                <Loading />
              </div>
            }>
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