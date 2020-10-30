import React from 'react';
import { Route, Switch } from 'react-router-dom';
// Views
import Home from './views/Home';
import NotFound from './views/NotFound';

export default function Router() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route component={NotFound} />
    </Switch>
  );
}
