import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
// Lib
import { useAuth } from '../../lib/AuthContext';
import { onError } from '../../lib/errorHandler';
// Components
import SignupForm from './SignupForm';
import ConfirmationCodeForm from './ConfirmationCodeForm';
import { Auth } from 'aws-amplify';
import { ISignUpResult } from 'amazon-cognito-identity-js';

export default function Signup() {
  const history = useHistory();
  const { setIsAuthenticated } = useAuth()!;
  const [signingUpUser, setSigningUpUser] = useState<IUser | null>(null);
  const [newUser, setNewUser] = useState<ISignUpResult | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (values: IUser) => {
    setIsLoading(true);
    setSigningUpUser(values);
    try {
      const newUser = await Auth.signUp({
        username: values.email,
        password: values.password,
      });
      setIsLoading(false);
      setNewUser(newUser);
    } catch (e) {
      onError(e);
      setIsLoading(false);
    }
  };

  const handleConfirmationSubmit = async (values: {
    confirmationCode: string;
  }) => {
    setIsLoading(true);
    if (signingUpUser) {
      try {
        await Auth.confirmSignUp(signingUpUser.email, values.confirmationCode);
        await Auth.signIn(signingUpUser.email, signingUpUser.password);
        setIsAuthenticated(true);
        history.push('/');
      } catch (e) {
        onError(e);
        setIsLoading(false);
      }
    }
  };

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
