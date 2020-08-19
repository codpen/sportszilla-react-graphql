import React, { useState, ReactElement } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Apollo from '../ApolloClient/Apollo';
import './Main.scss';
import Navbar from '../Navbar/Navbar';
import Board from '../Board/Board';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import Profile from '../Profile/Profile';
import Data from '../../mockData/data.json';
<<<<<<< HEAD
import Map from '../Map/Map';
import EventList from '../EventList/EventList';
=======
>>>>>>> 157134cd676bebe443c44a0f61e7225e33b9cdee

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
<<<<<<< HEAD

      <div className="left">
        <main>
          <Switch>
            <Route exact path="/apollo/">
              <Apollo />
            </Route>
            <Route exact path="/board/">
              <Board />
            </Route>
            <Route path="/user/profile/">
              <EventList />
            </Route>
            <Route path="/user/login/">
              <Login />
            </Route>
            <Route path="/user/signUp/">
              <SignUp />
            </Route>
            <Redirect from="/" to="/board/" />
          </Switch>
        </main>
      </div>
=======
      <main>
        <Switch>
          <Route exact path="/board/">
            <Board />
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
          <Redirect from="/" to="/board/" />
        </Switch>
      </main>
>>>>>>> 157134cd676bebe443c44a0f61e7225e33b9cdee
    </div>
  );
}

export default Main;
