import React, { useState, ReactElement } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import './Main.scss';
import Navbar from '../Navbar/Navbar';
import Board from '../Board/Board';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import Profile from '../Profile/Profile';
import Map from '../Map/Map';

interface PropTypes {
  boolProp: boolean;
}
function Main({ boolProp }: PropTypes): ReactElement {
  const [numberProp, setNumberProp] = useState<number>(10);
  const [stringProp, setStringProp] = useState<string>('text');

  return (
    <div className="Main">
      <header>
        <Navbar />
      </header>

      <main>
        <div className="left">
          <Switch>
            <Route exact path="/board/">
              <Board numberProp={numberProp} stringProp={stringProp} />
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
          <div className="iconContainer"></div>
          <div className="tableContainer"></div>
        </div>
        <div className="right">
          <Map />
        </div>
      </main>

      {/* <footer>
        <Footer />
      </footer> */}
    </div>
  );
}

export default Main;
