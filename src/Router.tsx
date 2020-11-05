import React from 'react';
import { Route, Switch } from 'react-router-dom';
// Views
import Home from './views/Home';
import Login from './views/Login';
import NewNote from './views/NewNote';
import NotFound from './views/NotFound';
import Signup from './views/Signup';

export default function Router() {
  return (
    <Switch>
      <Route path="/" exact component={Home} />
      <Route path="/login" exact component={Login} />
      <Route path="/signup" exact component={Signup} />
      <Route path="/notes/new" exact component={NewNote} />
      <Route component={NotFound} />
    </Switch>
  );
}
