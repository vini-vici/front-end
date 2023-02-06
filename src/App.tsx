import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Loading from '@vini-vici/viddi/dist/loading/loading.component';
import Footer from '@/components/footer/footer.component';

import ErrorBoundary from './components/errorboundary.component';
import Navbar from './components/navbar/navbar.component';

import ReactQueryProvider from './providers/reactQuery';

function AppComponent(): React.ReactElement {

  return (
    <ErrorBoundary>
      <ReactQueryProvider>
        <React.Suspense fallback="Loading...">
          <RecoilRoot>
            <Router>
              <Navbar />
              <React.Suspense fallback={
                <div style={{ flexGrow: 1, display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
                  <Loading size={1.5} />
                </div>
              }>
                <Switch>
                  <Route
                    path="/"
                    exact
                    component={
                      React.lazy(
                        () => import(/* webpackChunkName: "IndexRoute", webpackPreload: true */'./routes/index/+page')
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
                        () => import(/* webpackChunkName: "AboutRoute"  */'./routes/about/+page')
                      )
                    }
                  />
                  <Route
                    path="/releases"
                    exact
                    component={
                      React.lazy(
                        () => import(/* webpackChunkName: "ReleaseRoute" */'./routes/releases/+page')
                      )
                    }
                  />
                  <Route
                    path="/logout"
                    exact
                    component={
                      React.lazy(
                        () => import(/* webpackChunkName: "LogoutRoute" */'./routes/logout/+page')
                      )
                    }
                  />
                  <Route
                    path="/login"
                    exact
                    component={
                      React.lazy(
                        () => import(/* webpackChunkName: "LoginRoute" */'./routes/login/+page')
                      )
                    }
                  />
                  <Route
                    path="/signup"
                    exact
                    component={
                      React.lazy(
                        () => import(/* webpackChunkName: "SignupRoute" */'./routes/signup/+page')
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
          </RecoilRoot>
        </React.Suspense>
      </ReactQueryProvider>
    </ErrorBoundary>
  );
}

export default AppComponent;