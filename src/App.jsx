import React from 'react';
import {
  BrowserRouter, Redirect, Route, Switch
} from 'react-router-dom';
import Login from 'views/Login';
import AdminLayout from 'layouts/Admin';
import 'stores/middlewares/persistent';
import withPersistedAuth from 'stores/authentication/withPersistedAuth';

const App = () => (
  <BrowserRouter>
    <Switch>
      <Route path="/login" component={Login} />
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </BrowserRouter>
);

export default withPersistedAuth(App);
