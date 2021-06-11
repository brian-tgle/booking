import React, { useEffect, useRef, useState } from 'react';
import {
  useLocation, Route, Switch, useHistory
} from 'react-router-dom';
import AdminNavbar from 'components/Navbars/AdminNavbar';
import Footer from 'components/Footer/Footer';
import Sidebar from 'components/Sidebar/Sidebar';
import routes from 'routes';
import sidebarImage from 'assets/img/sidebar-5.jpg';
import useAuthentication from 'stores/authentication/authentication';
import { ROUTES } from 'common/constants';

function Admin() {
  const [image] = useState(sidebarImage);
  const [color] = useState('black');
  const [hasImage] = useState(true);
  const location = useLocation();
  const mainPanel = useRef(null);
  const [authentication] = useAuthentication();
  const history = useHistory();
  const getRoutes = (routeList) => routeList.map((prop) => {
    if (prop.layout === '/admin') {
      return (
        <Route
          path={prop.layout + prop.path}
          render={(props) => <prop.component {...props} />}
          key={prop.path}
        />
      );
    }
    return null;
  });

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
    mainPanel.current.scrollTop = 0;
    if (
      window.innerWidth < 993
      && document.documentElement.className.indexOf('nav-open') !== -1
    ) {
      document.documentElement.classList.toggle('nav-open');
      const element = document.getElementById('bodyClick');
      element.parentNode.removeChild(element);
    }
  }, [location]);

  useEffect(() => {
    if (!authentication.loggedIn) {
      history.replace(ROUTES.LOGIN);
    }
  }, [authentication]);

  return (
    <>
      <div className="wrapper">
        <Sidebar color={color} image={hasImage ? image : ''} routes={routes} />
        <div className="main-panel" ref={mainPanel}>
          <AdminNavbar />
          <div className="content">
            <Switch>{getRoutes(routes)}</Switch>
          </div>
          <Footer />
        </div>
      </div>
    </>
  );
}

export default Admin;
