import React from 'react';
// lib
import useForm from '../../hooks/useForm';
import validate from '../../lib/validationRules';
// components
import { Link } from 'react-router-dom';
import FormField from '../../components/FormField';
import Button from '../../components/Button';

interface SignupFormProps {
  sendCredentials: (val: IUser) => void;
  busy: boolean;
}

export default function SignupForm({ sendCredentials, busy }: SignupFormProps) {
  const initialValues = {
    email: '',
    password: '',
    confirmPassword: '',
  };

  const { values, handlers, errors } = useForm(
    sendCredentials,
    validate,
    initialValues
  );

  return (
    <>
      <h1 className="text-3xl font-medium text-gray-700">Sign up</h1>
      <p>
        Already have an account?{' '}
        <Link className="text-indigo-600 hover:text-indigo-400" to="/login">
          Login
        </Link>
      </p>
      <div className="rounded border w-2/5 p-8 text-left mx-auto mt-8">
        <form onSubmit={handlers.handleSubmit} className="space-y-6">
          <FormField
            autofocus
            labelMessage="Email address"
            type="email"
            name="email"
            placeholder="john.doe@mail.com"
            onChange={handlers.handleChange}
            onFocus={handlers.handleFocus}
            onBlur={handlers.handleBlur}
            isRequired
            value={values.email}
            errors={errors}
          />
          <FormField
            labelMessage="Password"
            type="password"
            name="password"
            onChange={handlers.handleChange}
            onFocus={handlers.handleFocus}
            onBlur={handlers.handleBlur}
            isRequired
            value={values.password}
            errors={errors}
          />
          <FormField
            labelMessage="Confirm password"
            type="password"
            name="confirmPassword"
            onChange={handlers.handleChange}
            onFocus={handlers.handleFocus}
            onBlur={handlers.handleBlur}
            isRequired
            value={values.confirmPassword}
            errors={errors}
          />
          <Button
            type="submit"
            disabled={Object.keys(errors).length > 0 || busy}
            label="Sign up"
            busy={busy}
          />
        </form>
      </div>
    </>
  );
}
