import React, { useState } from 'react';
import { Auth } from 'aws-amplify';
import { useHistory } from 'react-router-dom';
// Hooks
import useForm from '../../hooks/useForm';
// Lib
import validate from '../../lib/validationRules';
import { useAuth } from '../../lib/AuthContext';
import { onError } from '../../lib/errorHandler';
// Components
import { Link } from 'react-router-dom';
import FormField from '../../components/FormField';
import Button from '../../components/Button';

interface ICredentials {
  email: string;
  password: string;
}

export default function Login() {
  const history = useHistory();
  const { setIsAuthenticated } = useAuth()!;
  const [isLoading, setIsLoading] = useState(false);

  async function setAuth(values: ICredentials) {
    try {
      setIsLoading(true);
      await Auth.signIn(values.email, values.password);
      setIsAuthenticated(true);
      setIsLoading(false);
      history.push('/');
    } catch (e) {
      onError(e);
    }
  }

  const initialValues = {
    email: '',
    password: '',
  };

  const { values, handlers, errors } = useForm(
    setAuth,
    validate,
    initialValues
  );

  return (
    <div className="container mx-auto pt-24 text-center">
      <h1 className="text-3xl font-medium text-gray-700">Sign in</h1>
      <p>
        Don't have an account?{' '}
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
            disabled={Object.keys(errors).length > 0 || isLoading}
            label="Login"
            busy={isLoading}
          />
        </form>
      </div>
    </div>
  );
}
