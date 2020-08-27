import React, { useState, useEffect, ReactElement } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Loader from '../Loader/Loader';
import { useQuery, useLazyQuery, gql } from '@apollo/client';
import Apollo from '../ApolloClient/Apollo';
import { LoginRequest, LoginResp } from '../User/LoginRequest';
import Navbar from '../Navbar/Navbar';
import Intro from '../Intro/Intro';
import Join from '../User/Join/Join';
import Login from '../User/Login/Login';
import SignUp from '../User/SignUp/SignUp';
import Profile from '../User/Profile/Profile';
import EventDetails from '../EventDetails/EventDetails';
import Data from '../../mockData/data.json';
import Board from '../Board/Board';
import CreateEvent from '../CreateEvent/CreateEvent';
import { UserData } from '../User/UserData';
import { EventData } from '../Board/Event';
import './Main.scss';

function Main(): ReactElement {
  interface Response {
    getAllEvents: EventData[];
  }

  const EVENTS = gql`
    query {
      getAllEvents {
        ID
        eventName
        sport {
          sportName
        }
        timeStart
        timeEnd
        location
        longitude
        latitude
        minParticipants
        maxParticipants
        participants {
          ID
        }
      }
    }
  `;

  const loginRequest: LoginRequest<LoginResp> = (loginData, path) => {
    const loginURL = `http://localhost:8000/auth/${path}`;
    const init: RequestInit = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      mode: 'cors',
      body: JSON.stringify(loginData),
    };
    return fetch(loginURL, init)
      .then((result) => (result.status >= 400 ? Promise.reject(result) : result))
      .then((result) => result.json())
      .catch(console.error);
  };

  const { loading, data, error } = useQuery<Response>(EVENTS);

  const [users, setUsers] = useState<UserData[]>([]);
  const [loggedInUser, setLoggedInUser] = useState<UserData>({ email: '' });

  if (loading) return <Loader boxHeight={400} />;
  if (error) return <div>Oopsie: {error.message}</div>;
  if (data && data.getAllEvents) {
    console.log(data.getAllEvents);
    return (
      <div className="Main">
        <header>
          <Navbar />
        </header>
        <main>
          <Switch>
            <Route path="/intro/">
              <Intro events={data.getAllEvents} />
            </Route>
            <Route path="/board/">
              <Board events={data.getAllEvents} />
            </Route>
            <Route path="/apollo/">
              <Apollo />
            </Route>
            <Route exact path="/newevent/">
              <CreateEvent user={loggedInUser} />
            </Route>
            <Route exact path="/event/:ID">
              <EventDetails />
            </Route>
            <Route exact path="/user/join/">
              <Join setUser={setLoggedInUser} loginRequest={loginRequest} />
            </Route>
            <Route exact path="/user/login/">
              <Login setUser={setLoggedInUser} loginRequest={loginRequest} />
            </Route>
            <Route exact path="/user/signup/">
              <SignUp setUser={setLoggedInUser} loginRequest={loginRequest} />
            </Route>
            <Route exact path="/user/profile/">
              <Profile user={loggedInUser} setUser={setLoggedInUser} />
            </Route>
            <Redirect from="/" to="/intro/" />
          </Switch>
        </main>
      </div>
    );
  }

  return <div></div>;
}

export default Main;
