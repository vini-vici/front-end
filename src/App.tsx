import React from 'react';
import { Route, Switch, BrowserRouter as Router } from 'react-router-dom';
import { RecoilRoot } from 'recoil';

import Loading from '@vini-vici/viddi/dist/loading/loading.component';
import Footer from '@/components/footer/footer.component';

import ErrorBoundary from './components/errorBoundary.component';
import Navbar from './components/navbar/navbar.component';

import ReactQueryProvider from './providers/reactQuery';

const IndexRoute = React.lazy(
  () => import(/* webpackChunkName: "IndexRoute", webpackPreload: true */'./routes/index/+page')
);

const CallbackRoute = React.lazy(
  () => import(/* webpackChunkName: "CallbackRoute" */'./routes/callback.route')
);

const LogoutRoute = React.lazy(
  () => import(/* webpackChunkName: "LogoutRoute" */ './routes/logout/+page')
);

const LoginRoute = React.lazy(
  () => import(/* webpackChunkName: "LoginRoute" */ './routes/login/+page')
);

const AboutRoute = React.lazy(
  () => import(/* webpackChunkName: "AboutRoute"  */ './routes/about/+page')
);

const ReleasesRoute = React.lazy(
  () => import(/* webpackChunkName: "ReleaseRoute" */ './routes/releases/+page')
);

const SignupRoute = React.lazy(
  () => import(/* webpackChunkName: "SignupRoute" */ './routes/signup/+page')
);

const NotFoundRoute = React.lazy(
  () => import(/* webpackChunkName: "404Route", webpackPrefetch: true */ './routes/_404')
);

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
                    index
                    element={
                      <IndexRoute />
                    }
                  />
                  <Route
                    path="/callback"
                    element={<CallbackRoute />}
                  />
                  <Route
                    path="/about"
                    element={
                      <AboutRoute />
                    }
                  />
                  <Route
                    path="/releases"
                    element={
                      <ReleasesRoute />
                    }
                  />
                  <Route
                    path="/logout"
                    element={
                      <LogoutRoute />
                    }
                  />
                  <Route
                    path="/login"
                    element={
                      <LoginRoute />
                    }
                  />
                  <Route
                    path="/signup"
                    element={
                      <SignupRoute />
                    }
                  />
                  <Route
                    element={
                      <NotFoundRoute />
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