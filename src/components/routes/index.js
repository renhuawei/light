import React from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import MainPage from 'views/MainPage';
import RefilBalancePage from 'views/RefilBalancePage';

const Routes = () => (
  <Switch>
    <Route path="/" exact component={MainPage} />
    <Route path="/provider/:id" component={RefilBalancePage} />
    <Redirect to="/" />
  </Switch>
);

export default Routes;
