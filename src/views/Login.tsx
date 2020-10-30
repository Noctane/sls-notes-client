import React from 'react';
// Hooks
import useForm from '../hooks/useForm';
// Lib
import validate from '../lib/validationRules';
// Components
import { Link } from 'react-router-dom';
import FormField from '../components/FormField';
import Button from '../components/Button';

export default function Login() {
  const client = () => false;
  const { values, handlers, setValues, errors } = useForm(client, validate, {});
  return (
    <div className="container mx-auto pt-24 text-center">
      <h1 className="text-3xl font-medium text-gray-700">Sign in</h1>
      <p>
        Already have an account?{' '}
        <Link className="text-indigo-600 hover:text-indigo-400" to="/signup">
          Sign up
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
          <div className="text-center">
            <Link to="/" className="text-indigo-600 hover:text-indigo-400">
              Forgot your password?
            </Link>
          </div>
          <Button
            type="submit"
            disabled={Object.keys(errors).length > 0}
            label="Login"
          />
        </form>
      </div>
    </div>
  );
}
