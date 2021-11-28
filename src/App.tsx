import React, { PropsWithChildren } from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import Loading from '@vini-vici/viddi/dist/loading/loading.component';
import Footer from '@/components/footer/footer.component';

import ErrorBoundary from './components/errorBoundary.component';
import Navbar from './components/navbar/navbar.component';

import store from '@/redux/store';
import { getUserThunk } from '@/redux/cognito/cognito.thunk';

const CognitoWrapper = ({ children }: PropsWithChildren<Record<string, unknown>>) => {
  React.useEffect(() => {
    store.dispatch(getUserThunk());
  }, []);
  return (
    <div>
      {children}
    </div>
  );
};

function AppComponent(): React.ReactElement {
  
  return (
    <ErrorBoundary>
      <Provider
        store={store}
      >
        <CognitoWrapper>
          <Router>
            <Navbar />
            <React.Suspense fallback={
              <div style={{ flexGrow: 1, textAlign: 'center' }}>
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
        </CognitoWrapper>
      </Provider>
    </ErrorBoundary>
  );
}

export default AppComponent;