import React, { Dispatch, SetStateAction } from 'react';
// import styles from './ButtonGeneric.module.scss';
// import { Link } from 'react-router-dom';
import './addToHome.scss'

interface PropTypes {
	buttonClick: () => void;
	toggle: (active: boolean) => void;
}

//on click set the previous state of the main component to false

export default function AddToHomeScreen ({ buttonClick, toggle }: PropTypes): JSX.Element {
	return (
  <div className="addToHomeScreen">
      <button className= 'addToScreen__Button' onClick = {buttonClick} data-testid="addToHomeScreen">
        <strong>Install app</strong>
      </button>
			<button className= 'dontAdd__Button' onClick = {() => toggle(false)} data-testid="dontAddtoHome">
				<strong>Don't install</strong>
			</button>
  </div>
);
}