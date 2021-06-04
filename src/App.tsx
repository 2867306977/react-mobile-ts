import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
  Redirect,
} from 'react-router-dom';
import routes, { RouteType } from './config/routes';

function App() {
  return (
    <Router>
      <Switch>
        {routes.map((item: RouteType, index: number) => {
          return <Route key={index} {...item} exact></Route>;
        })}
        <Redirect to="/phoneLogin" />
      </Switch>
    </Router>
  );
}

export default App;
