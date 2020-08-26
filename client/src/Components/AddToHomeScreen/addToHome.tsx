import React from 'react';
// import styles from './ButtonGeneric.module.scss';
// import { Link } from 'react-router-dom';
import './addToHome.scss'

interface PropTypes {
  buttonClick: () => void;
}

//another button opt 'no'
//set the previous state of the main component to false

export default function AddToHomeScreen ({ buttonClick }: PropTypes): JSX.Element {
	console.log('hi');
	return (
  <div className="addToHomeScreen">
      <button className= 'addToScreen__Button' onClick = {buttonClick} data-testid="addToHomeScreen">
        <strong>Install app</strong>
      </button>
  </div>
);
}