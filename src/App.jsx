import React, { Suspense } from 'react';
import {
  BrowserRouter, Redirect, Route, Switch
} from 'react-router-dom';
import Login from 'views/Login';
import AdminLayout from 'layouts/Admin';
import 'stores/middlewares/persistent';
import withPersistedAuth from 'stores/authentication/withPersistedAuth';
import Loading from 'components/Loading/Loading';

const App = () => (
  <BrowserRouter>
    <Suspense fallback={<Loading />}>
      <Switch>
        <Route path="/login" component={Login} />
        <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
        <Redirect from="/" to="/admin/dashboard" />
      </Switch>
    </Suspense>
  </BrowserRouter>
);

export default withPersistedAuth(App);
