import React from 'react'
import NavBar from './NavBar';

const ProtectedLayout = ({ children }) => {
  return (
    <div>
      <NavBar authenticated/>
      {children}
    </div>
  )
}

export default ProtectedLayout;
