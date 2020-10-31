import React, { useState, useEffect } from 'react';
import Router from './Router';
import { Auth } from 'aws-amplify';
// Components
import Header from './components/Header';
// Lib
import { useAuth } from './lib/AuthContext';
import { onError } from './lib/errorHandler';

function App() {
  const [isAuthenticating, setIsAuthenticating] = useState(true);
  const { setIsAuthenticated } = useAuth()!;

  useEffect(() => {
    async function onLoad() {
      try {
        await Auth.currentSession();
        setIsAuthenticated(true);
      } catch (e) {
        if (e !== 'No current user') {
          onError(e);
        }
      }
      setIsAuthenticating(false);
    }
    onLoad();
  }, [setIsAuthenticated]);

  return (
    <>
      <Header />
      {!isAuthenticating && <Router />}
    </>
  );
}

export default App;
