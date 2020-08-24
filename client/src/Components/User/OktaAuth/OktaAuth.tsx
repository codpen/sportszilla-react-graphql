import { useOktaAuth } from '@okta/okta-react';
import React from 'react';
import styles from './OktaAuth.module.scss';

const OktaAuth: React.FC = () => {
  const { authState, authService } = useOktaAuth();
  const login = () => authService.login('/profile');

  if( authState.isPending ) {
    return (
      <div>Loading authentication...</div>
    );
  } else if( !authState.isAuthenticated ) {
    return (
      <div style={{ marginTop: '400px', fontSize: '22px' }}>
        <a onClick={login}>Login</a>
      </div>
    );
  }
  return (
    <div></div>
  )
};

export default OktaAuth;
