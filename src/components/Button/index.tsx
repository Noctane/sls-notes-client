import React from 'react';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  disabled: boolean;
  label: string;
}

export default function Button({ type, disabled, label }: ButtonProps) {
  const classnames = `
    ${
      disabled
        ? 'bg-gray-300 text-gray-500 cursor-auto'
        : 'bg-indigo-600 text-white hover:bg-indigo-400'
    }
    w-full
    block
    rounded
    py-3
    px-4
    transition
    ease-in-out
    duration-150
  `;

  return (
    <button className={classnames} type={type} disabled={disabled}>
      {label}
    </button>
  );
}
