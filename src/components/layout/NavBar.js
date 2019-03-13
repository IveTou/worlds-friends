import React from 'react';
import { Link } from 'react-router-dom';
import SignedInLinks from '../layout/SignedInLinks';
import SignedOutLinks from '../layout/SignedOutLinks';

const NavBar = () => {
  return (
    <nav className="nav.wraper grey darken-3">
      <div className="container">
        <Link to='/' className="brand-logo">Ninja Plan</Link>
        <SignedInLinks />
        <SignedOutLinks />
      </div>
    </nav>
  )
}

export default NavBar;
