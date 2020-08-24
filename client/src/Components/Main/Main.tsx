import React, { useState, ReactElement } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Apollo from '../ApolloClient/Apollo';
import { LoginRequest, jwtToken } from './main';
import Navbar from '../Navbar/Navbar';
import Intro from '../Intro/Intro';
import Join from '../User/Join/Join';
import Login from '../User/Login/Login';
import SignUp from '../User/SignUp/SignUp';
import Profile from '../User/Profile/Profile';
import Data from '../../mockData/data.json';
import Board from '../Board/Board';
import { UserData } from '../User/UserData';
import './Main.scss';

function Main(): ReactElement {
  const [users, setUsers] = useState<UserData[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<UserData>({ email: '' });

  const [events, setEvents] = useState<object[]>([Data.events]);
  const [sport, setSport] = useState<object[]>([Data.sports]);

  const loginRequest: LoginRequest<jwtToken>= (loginData) => {
    const loginURL = `http://localhost:8000/auth/${loginData.path}`
    const init: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(loginData),
    }
    return fetch(loginURL, init)
      .then((result) => (result.status >= 400 ? Promise.reject(result) : result))
      .then((result) => result.json())
      .catch(console.error);
  };

  return (
    <div className="Main">
      <header>
        <Navbar />
      </header>
      <main>
        <Switch>
          <Route path="/intro/">
            <Intro />
          </Route>
          <Route path="/board/">
            <Board />
          </Route>
          <Route path="/apollo/">
            <Apollo />
          </Route>
          <Route exact path="/user/join/">
            <Join />
          </Route>
          <Route exact path="/user/login/">
            <Login loginRequest={loginRequest} />
          </Route>
          <Route exact path="/user/signup/">
            <SignUp loginRequest={loginRequest} />
          </Route>
          <Route exact path="/user/profile/">
            <Profile user={loggedInUser} setUser={setLoggedInUser} />
          </Route>
          <Route exact path="/implicit/callback" />
          <Redirect from="/" to="/intro/" />
        </Switch>
      </main>
    </div>
  );
}

export default Main;
