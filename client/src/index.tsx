import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { Security } from '@okta/okta-react';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ThemeProvider } from '@zendeskgarden/react-theming';
import './index.css';
import Main from './Components/Main/Main';
import * as serviceWorker from './Service/serviceWorker';

const oktaConfig = {
  clientId: '0oarhu9dyvVsoDNOI4x6',
  issuer: 'https://dev-116064.okta.com/oauth2/default',
  redirectUri: 'http://localhost:3000/implicit/callback',
  scopes: ['openid', 'profile', 'email'],
  pkce: true
};

const link = createHttpLink({
  uri: 'http://localhost:8000/graphql',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link,
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <Router>
        <Security {...oktaConfig}>
          <ApolloProvider client={client}>
            <Main />
          </ApolloProvider>
        </Security>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
