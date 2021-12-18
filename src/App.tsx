import React from 'react';
import { Provider } from 'react-redux';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';

import Loading from '@vini-vici/viddi/dist/loading/loading.component';
import Footer from '@/components/footer/footer.component';

import ErrorBoundary from './components/errorBoundary.component';
import Navbar from './components/navbar/navbar.component';

import store from '@/redux/store';
import { getUserThunk } from '@/redux/cognito/cognito.thunk';
import { getGithubIssues } from './redux/github/github.thunk';

import Commands from './components/commands.component';

function AppComponent(): React.ReactElement {


  React.useEffect(() => {
    store.dispatch(getUserThunk());
    store.dispatch(getGithubIssues());
  }, []);

  return (
    <ErrorBoundary>
      <Provider
        store={store}
      >
        <Commands />
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
                path="/releases"
                exact
                component={
                  React.lazy(
                    () => import(/* webpackChunkName: "ReleaseRoute" */'./routes/releases.route')
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
      </Provider>
    </ErrorBoundary>
  );
}

export default AppComponent;