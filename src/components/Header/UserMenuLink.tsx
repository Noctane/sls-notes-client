import React from 'react';
import { Link } from 'react-router-dom';

interface UserMenuLinkProps {
  to?: string;
  label: string;
  full?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
}

export default function UserMenuLink({
  to,
  label,
  full,
  onClick,
}: UserMenuLinkProps) {
  if (to) {
    return (
      <Link
        className={`rounded py-3 px-4 transition ease-in-out duration-150${
          full
            ? ' bg-indigo-600 text-white hover:bg-indigo-400'
            : ' text-gray-600 hover:text-gray-500'
        }`}
        to={to}
      >
        {label}
      </Link>
    );
  }
  return (
    <button
      className={`rounded py-3 px-4 transition ease-in-out duration-150${
        full
          ? ' bg-indigo-600 text-white hover:bg-indigo-400'
          : ' text-gray-600 hover:text-gray-500'
      }`}
      onClick={onClick}
    >
      {label}
    </button>
  );
}
