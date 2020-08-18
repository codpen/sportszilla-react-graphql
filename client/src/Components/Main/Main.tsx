import React, { useState, ReactElement } from 'react';
import { Switch, Redirect, Route } from 'react-router-dom';
import Apollo from '../ApolloClient/Apollo';
import logo from '../../Images/logo.svg';
import './Main.scss';
import Navbar from '../Navbar/Navbar';
import Board from '../Board/Board';
import Footer from '../Footer/Footer';
import Login from '../Login/Login';
import SignUp from '../SignUp/SignUp';
import Profile from '../Profile/Profile';

interface PropTypes {
  boolProp: boolean;
}
function Main({ boolProp }: PropTypes): ReactElement {
  const [numberProp, setNumberProp] = useState<number>(10);
  const [stringProp, setStringProp] = useState<string>('text');

  return (
    <div className="Main">
      <header>
        <img src={logo} className="Main-logo" alt="logo" height={80} width={80}/>
        <Navbar />
      </header>

      <section>
        <Apollo />
      </section>

      <main>
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
      </main>

      <footer>
        <Footer />
      </footer>
    </div>
  );
}

export default Main;
