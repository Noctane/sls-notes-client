import React from 'react';
import { Link } from 'react-router-dom';
// Components
import UserMenuLink from './UserMenuLink';

export default function Header() {
  return (
    <div className="container mx-auto border-b border-gray-300 py-6 flex justify-between">
      <div className="brand">
        <Link to="/">
          <h1 className="text-xl font-bold text-indigo-600">Note App</h1>
        </Link>
      </div>
      <div className="space-x-6">
        <UserMenuLink to="/login" label="Login" />
        <UserMenuLink to="/signup" label="Sign up" full />
      </div>
    </div>
  );
}
