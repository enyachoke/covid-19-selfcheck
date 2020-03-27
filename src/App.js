import React, { Suspense } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Container, Navbar, NavbarBrand } from 'reactstrap';
import {
  BrowserRouter as Router,
  Switch,
  Route,
} from "react-router-dom";
import './App.css';
const Recommendation = React.lazy(() => import('./components/Recommendation'));
const Information = React.lazy(() => import('./components/Information'));
const SelfCheck = React.lazy(() => import('./components/SelfCheck'));


function App() {
  return (
    <div>
      <Router>
        <Navbar color="light" light expand="md">
          <NavbarBrand href="/">Covid-19 Self Check</NavbarBrand>
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
