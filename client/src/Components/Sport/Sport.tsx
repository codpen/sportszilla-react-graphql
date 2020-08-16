import React from 'react';
import styles from './Sport.module.scss';

type SportObj = {
  id: number;
  name: string;
};

interface PropTypes {
  sport: SportObj;
}

const Sport: React.FC<PropTypes> = ({ sport }) => {
  const logo = require(`../../Images/SportSVG/${sport.name}.svg`);

  return (
    <div className={styles.Sport} data-testid="Sport">
      <img className={styles.SportImage} src={logo} alt={sport.name} />
    </div>
  );
};

export default Sport;
