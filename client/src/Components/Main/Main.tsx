import React, { useState, ReactElement } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Apollo from '../ApolloClient/Apollo';
import './Main.scss';
import Navbar from '../Navbar/Navbar';
import Board from '../Board/Board';
import Footer from '../Footer/Footer';
import Login from '../User/Login/Login';
import SignUp from '../User/SignUp/SignUp';
import Profile from '../User/Profile/Profile';
import Data from '../../mockData/data.json';
import Map from '../Map/Map';

interface PropTypes {
  boolProp: boolean;
}
function Main({ boolProp }: PropTypes): ReactElement {
  const [users, setUsers] = useState<object[]>([Data.users]);
  const [events, setEvents] = useState<object[]>([Data.events]);
  const [sport, setSport] = useState<object[]>([Data.sports]);

  return (
    <div className="Main">
      <header>
        <Navbar />
      </header>
      <main>
        <Switch>
          <Route exact path="/intro/">
            <Board />
          </Route>
          <Route exact path="/apollo/">
            <Apollo />
          </Route>
          <Route path="/user/profile/">
            <Profile />
          </Route>
          <Route path="/user/login/">
            <Login />
          </Route>
          <Route path="/user/signUp/">
            <SignUp />
          </Route>
          <Redirect from="/" to="/intro/" />
        </Switch>
      </main>
    </div>
  );
}

export default Main;
