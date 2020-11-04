import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// Hooks
import useForm from '../hooks/useForm';
// Lib
import validate from '../lib/validationRules';
import { useAuth } from '../lib/AuthContext';
import { onError } from '../lib/errorHandler';
// Components
import { Link } from 'react-router-dom';
import FormField from '../components/FormField';
import Button from '../components/Button';

export default function Signup() {
  const history = useHistory();
  const { setIsAuthenticated } = useAuth()!;
  const [newUser, setNewUser] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async () => {
    setIsLoading(true);
    setNewUser('test');
    setIsLoading(false);
  };

  const handleConfirmationSubmit = async () => {
    setIsLoading(true);
  };

  console.log(newUser);

  return (
    <div className="container mx-auto pt-24 text-center">
      {newUser === null ? (
        <SignupForm sendCredentials={handleSubmit} busy={isLoading} />
      ) : (
        <ConfirmationCodeForm
          sendConfirmationCode={handleConfirmationSubmit}
          busy={isLoading}
        />
      )}
    </div>
  );
}

interface SignupFormProps {
  sendCredentials: () => void;
  busy: boolean;
}

function SignupForm({ sendCredentials, busy }: SignupFormProps) {
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

  console.log(errors);
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

interface ConfirmationCodeFormProps {
  sendConfirmationCode: () => void;
  busy: boolean;
}

function ConfirmationCodeForm({
  sendConfirmationCode,
  busy,
}: ConfirmationCodeFormProps) {
  const initialValues = {
    confirmationCode: '',
  };

  const { values, handlers, errors } = useForm(
    sendConfirmationCode,
    validate,
    initialValues
  );
  return (
    <>
      <h1 className="text-3xl font-medium text-gray-700">Confirmation code</h1>
      <div className="rounded border w-2/5 p-8 text-left mx-auto mt-8">
        <form onSubmit={handlers.handleSubmit} className="space-y-6">
          <FormField
            autofocus
            labelMessage="Confirmation Code"
            type="tel"
            name="confirmationCode"
            onChange={handlers.handleChange}
            onFocus={handlers.handleFocus}
            onBlur={handlers.handleBlur}
            isRequired
            value={values.confirmationCode}
            errors={errors}
          />
          <div className="text-center">
            Check your email for the confirmation code
          </div>
          <Button
            type="submit"
            disabled={Object.keys(errors).length > 0 || busy}
            label="Verify"
            busy={busy}
          />
        </form>
      </div>
    </>
  );
}
