import React from 'react';
import { Input, Label, TextArea, ErrorSpan } from './styles';

interface FormFieldProps {
  className?: string;
  autofocus?: boolean;
  labelMessage: string;
  name: string;
  type: 'email' | 'text' | 'date' | 'textarea' | 'file' | 'password' | 'tel';
  placeholder?: string;
  isRequired?: boolean;
  onFileChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  onChange?: (
    event:
      | React.ChangeEvent<HTMLInputElement>
      | React.ChangeEvent<HTMLTextAreaElement>
  ) => void;
  onBlur: () => void;
  onFocus: () => void;
  value?: string | number;
  errors: ErrorsType;
  inputRef?: any;
}

function FormField({
  labelMessage,
  name,
  type,
  autofocus,
  placeholder,
  className,
  isRequired,
  onChange,
  onFileChange,
  onBlur,
  onFocus,
  value,
  errors,
  inputRef,
}: FormFieldProps) {
  if (type === 'textarea') {
    return (
      <div className={className}>
        <Label htmlFor={name}>{labelMessage}</Label>
        <TextArea
          name={name}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          required={isRequired}
          value={value}
        />
        {errors.hasOwnProperty(name) && <ErrorSpan>{errors[name]}</ErrorSpan>}
      </div>
    );
  } else if (type === 'file') {
    return (
      <div className={className}>
        <Label htmlFor={name}>{labelMessage}</Label>
        <Input
          autoFocus={autofocus}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onFileChange}
          onBlur={onBlur}
          onFocus={onFocus}
          required={isRequired}
          ref={inputRef}
        />

        {errors.hasOwnProperty(name) && <ErrorSpan>{errors[name]}</ErrorSpan>}
      </div>
    );
  } else {
    return (
      <div className={className}>
        <Label htmlFor={name}>{labelMessage}</Label>
        <Input
          autoFocus={autofocus}
          name={name}
          type={type}
          placeholder={placeholder}
          onChange={onChange}
          onBlur={onBlur}
          onFocus={onFocus}
          required={isRequired}
          value={value}
        />
        {errors.hasOwnProperty(name) && <ErrorSpan>{errors[name]}</ErrorSpan>}
      </div>
    );
  }
}

export default FormField;
