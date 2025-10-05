import React from 'react';
import { Link, useLocation } from 'react-router-dom';

function Header() {
  const location = useLocation();

  return (
    <header className="header">
      <div className="header-content">
        <div className="logo">
          🛕 Temple Crowd Management
        </div>
        <nav>
          <ul className="nav-links">
            <li>
              <Link to="/" className={location.pathname === '/' ? 'active' : ''}>
                Dashboard
              </Link>
            </li>
            <li>
              <Link to="/emergency" className={location.pathname === '/emergency' ? 'active' : ''}>
                Emergency
              </Link>
            </li>
            <li>
              <Link to="/profile" className={location.pathname === '/profile' ? 'active' : ''}>
                Profile
              </Link>
            </li>
            <li>
              <Link to="/admin" className={location.pathname === '/admin' ? 'active' : ''}>
                Admin
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
}

export default Header;