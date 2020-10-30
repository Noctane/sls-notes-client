import tw from 'twin.macro';

export const Input = tw.input`
  appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
`;

export const Label = tw.label`
  block text-gray-700 text-sm font-bold mb-2
`;

export const TextArea = tw.textarea`
  shadow appearance-none border rounded w-full h-24 py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline
`;

export const ErrorSpan = tw.span`
  text-red-500
  text-sm
`;
