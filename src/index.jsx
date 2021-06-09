import React from 'react';
import ReactDOM from 'react-dom';

import {
  BrowserRouter, Route, Switch, Redirect,
} from 'react-router-dom';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'assets/css/light-bootstrap-dashboard-react.css';
import 'assets/css/animate.min.css';
import 'assets/css/demo.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import AdminLayout from 'layouts/Admin';

ReactDOM.render(
  <BrowserRouter>
    <Switch>
      <Route path="/admin" render={(props) => <AdminLayout {...props} />} />
      <Redirect from="/" to="/admin/dashboard" />
    </Switch>
  </BrowserRouter>,
  document.getElementById('root'),
);
