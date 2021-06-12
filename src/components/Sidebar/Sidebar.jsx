import React from 'react';
import { useLocation, NavLink, Link } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import Logo from 'assets/img/reactlogo.png';
import { ROUTES, USER_ROLES } from 'common/constants';
import useAuthentication from 'stores/authentication/authentication';

function Sidebar({ color, image, routes }) {
  const location = useLocation();
  const [authentication] = useAuthentication();
  const activeRoute = (routeName) => (location.pathname.indexOf(routeName) > -1 ? 'active' : '');
  const renderMenuItem = (prop) => (
    <li
      className={
        prop.upgrade
          ? 'active active-pro'
          : activeRoute(prop.layout + prop.path)
      }
      key={prop.path}
    >
      <NavLink
        to={prop.layout + prop.path}
        className="nav-link"
        activeClassName="active"
      >
        <i className={prop.icon} />
        <p>{prop.name}</p>
      </NavLink>
    </li>
  );

  return (
    <div className="sidebar" data-image={image} data-color={color}>
      <div
        className="sidebar-background"
        style={{
          backgroundImage: `url(${image})`
        }}
      />
      <div className="sidebar-wrapper">
        <div className="logo d-flex align-items-center justify-content-start">
          <Link
            to={ROUTES.DASHBOARD}
            className="simple-text logo-mini mx-1"
          >
            <div className="logo-img">
              <img
                src={Logo}
                alt="..."
              />
            </div>
          </Link>
          <Link className="simple-text" to={ROUTES.DASHBOARD}>
            Booking Portal
          </Link>
        </div>
        <Nav>
          {routes.map((prop) => {
            if (!prop.redirect) {
              if (!prop.needAdminPermission) {
                return renderMenuItem(prop);
              }
              if (authentication.user?.role === USER_ROLES.ADMIN) {
                return renderMenuItem(prop);
              }
              return null;
            }
            return null;
          })}
        </Nav>
      </div>
    </div>
  );
}

export default Sidebar;
