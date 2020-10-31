import React from 'react';
import { Auth } from 'aws-amplify';
import { Link, useHistory } from 'react-router-dom';
// Lib
import { useAuth } from '../../lib/AuthContext';
// Components
import UserMenuLink from './UserMenuLink';

export default function Header() {
  const history = useHistory();
  const { isAuthenticated, setIsAuthenticated } = useAuth()!;

  async function handleLogout() {
    await Auth.signOut();
    setIsAuthenticated(false);
    history.push('/login');
  }

  return (
    <div className="container mx-auto border-b border-gray-300 py-6 flex justify-between">
      <div className="brand">
        <Link to="/">
          <h1 className="text-xl font-bold text-indigo-600">Notes App</h1>
        </Link>
      </div>
      <div className="space-x-6">
        {isAuthenticated ? (
          <UserMenuLink onClick={handleLogout} label="Logout" />
        ) : (
          <>
            <UserMenuLink to="/login" label="Login" />
            <UserMenuLink to="/signup" label="Sign up" full />
          </>
        )}
      </div>
    </div>
  );
}
