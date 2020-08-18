import React from 'react';
import ReactDOM from 'react-dom';
import { BrowserRouter as Router } from 'react-router-dom';
import { ApolloProvider, ApolloClient, InMemoryCache, createHttpLink } from '@apollo/client';
import { ThemeProvider } from '@zendeskgarden/react-theming';
import './index.css';
import Main from './Components/Main/Main';
import * as serviceWorker from './Service/serviceWorker';

const link = createHttpLink({
  uri: 'http://localhost:8000',
});

const client = new ApolloClient({
  cache: new InMemoryCache(),
  link
});

ReactDOM.render(
  <React.StrictMode>
    <ThemeProvider>
      <Router>
        <ApolloProvider client={client}>
          <Main boolProp={false} />
        </ApolloProvider>
      </Router>
    </ThemeProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
