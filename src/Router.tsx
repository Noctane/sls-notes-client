import React from 'react';
import { Route, Switch } from 'react-router-dom';
// Views
import Home from './views/Home';
import Login from './views/Login';
import NotFound from './views/NotFound';

export default function Router() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route component={NotFound} />
    </Switch>
  );
}
