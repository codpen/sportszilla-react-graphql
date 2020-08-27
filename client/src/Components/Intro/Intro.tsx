import React, {useState} from 'react';
import styles from './Intro.module.scss';
import Data from '../../mockData/data.json';
import ButtonGeneric from '../ButtonGeneric/ButtonGeneric';
import Map from '../Map/Map';
import { EventData } from '../Board/Event';
import AddToHomeScreen from '../AddToHomeScreen/addToHome'
interface PropTypes {
  events: EventData[];
}

const Intro: React.FC<PropTypes> = ({ events }) => {

  const [promptState, promptSetState] = useState<boolean>(true);
  let defPrompt: any;
  window.addEventListener('beforeinstallprompt', (e) => {
    e.preventDefault();
    defPrompt = e;
    // promptSetState(true)
    console.log( 'defPrompt',defPrompt)
  }); 
  const addToHomeHandler = () => {
    defPrompt.prompt();
    defPrompt.userChoice.then((choiceResult: any)=> {
      if (choiceResult.outcome === 'accepted') {
        console.log('User accepted the A2HS prompt');
      }
      promptSetState(false)
    });
  };
  
  
  return (
  
  <div className={styles.Intro} data-testid="Intro">
    {promptState ? <AddToHomeScreen toggle={promptSetState} buttonClick={addToHomeHandler} /> : null}
    <div className={styles.Intro_Title}>
      <h1>Find Your Next Teammates</h1>
    </div>
    <div>
      <ButtonGeneric buttonText="Events" buttonLink="/board/" />
      <ButtonGeneric buttonText="Join Now" buttonLink="/user/join/" />
    </div>
    <div className={styles.container}>
      <div className={styles.mapContainer}>
        <Map events={events} />
      </div>
    </div>
  </div>
);
}

export default Intro;
