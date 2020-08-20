import React, { useState, ReactElement } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Apollo from '../ApolloClient/Apollo';
import './Main.scss';
import Navbar from '../Navbar/Navbar';
import Intro from '../Intro/Intro';
import Join from '../User/Join/Join';
import Profile from '../User/Profile/Profile';
import Data from '../../mockData/data.json';
import Board from '../Board/Board';

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
          <Route exact path="/user/profile/">
            <Profile />
          </Route>
          <Redirect from="/" to="/intro/" />
        </Switch>
      </main>
    </div>
  );
}

export default Main;
