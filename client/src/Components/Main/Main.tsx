import React from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import logo from '../../Images/logo.svg';
import './Main.scss';
import Navbar from '../Navbar/Navbar';
import Board from '../Board/Board';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';

function Main() {
  return (
    <div className="Main">
      <header>
        <Navbar />
      </header>

      <main>
      <Switch>
          <Route exact path="/board/">
            <Board />
          </Route>
          <Route path="/user/profile/">
            <Profile />
          </Route>
          <Route path="/user/signIn/">
            <Login />
          </Route>
          <Route path="/user/signUp/">
            <SignUp />
          </Route>
          <Redirect from="/" to="/board/" />
        </Switch>
        <img src={logo} className="Main-logo" alt="logo" />
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Main;
