import React from 'react';
import tw, { styled } from 'twin.macro';
import PuffLoader from 'react-spinners/PuffLoader';

interface ButtonProps {
  type: 'button' | 'submit' | 'reset';
  disabled: boolean;
  label: string;
  busy?: boolean;
}

const ButtonStyles = styled.button`
  ${tw`w-full block rounded py-3 px-4 transition ease-in-out duration-150 bg-indigo-600 text-white hover:bg-indigo-400`}
  ${({ busy }: any) =>
    busy && tw`border border-indigo-400 bg-white text-indigo-600`}
  ${({ disabled, busy }) =>
    disabled && !busy && tw`bg-gray-300 text-gray-500 cursor-auto`}
`;

export default function Button({ busy, type, disabled, label }: ButtonProps) {
  return (
    <ButtonStyles type={type} disabled={disabled} busy={busy}>
      <div className="flex justify-center space-x-2 items-center">
        {busy && <PuffLoader size={30} color="#5a67d8" />}
        <span>{label}</span>
      </div>
    </ButtonStyles>
  );
}
