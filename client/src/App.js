import React, { Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'formiojs/dist/formio.full.css'
import { Container, Navbar, NavbarBrand } from 'reactstrap';
import {
  HashRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
import Firebase from 'firebase';
import config from './constants/config_dev';
const Recommendation = React.lazy(() => import('./components/Recommendation'));
const Information = React.lazy(() => import('./components/Information'));
const SelfCheck = React.lazy(() => import('./components/SelfCheck'));
const CallApp = React.lazy(() => import('./components/call/CallApp'));
const Doctor = React.lazy(() => import('./components/Doctor'));

Firebase.initializeApp(config);
function App() {
  return (
    <div>
      <Router>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Covid-19 Self Check</NavbarBrand>
          <NavbarBrand href="/#/doctor">Doctor Panel</NavbarBrand>
        </Navbar>
        <Container className="mt-2">
          <Switch>
            <Route path="/covid-19-info">
              <Suspense fallback={<div>Loading...</div>}>
                <Information />
              </Suspense>
            </Route>
            <Route path="/recommendations">
              <Suspense fallback={<div>Loading...</div>}>
                <Recommendation />
              </Suspense>
            </Route>
            <Route path="/consult/:county/:formId/:riskLevel">
              <Suspense fallback={<div>Loading...</div>}>
                <CallApp />
              </Suspense>
            </Route>
            <Route path="/doctor/:callId/:county">
              <Suspense fallback={<div>Loading...</div>}>
                <CallApp />
              </Suspense>
            </Route>
            <Route path="/doctor">
              <Suspense fallback={<div>Loading...</div>}>
                <Doctor />
              </Suspense>
            </Route>
            <Route path="/">
              <Suspense fallback={<div>Loading...</div>}>
                <SelfCheck />
              </Suspense>
            </Route>
        /</Switch>

        </Container>
      </Router>
    </div>
  );
}

export default App;
