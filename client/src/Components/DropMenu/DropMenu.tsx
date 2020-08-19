import React, { useState } from 'react';
import styles from './DropMenu.module.scss';

const DropMenu: React.FC = () => {
  const [rotated, setRotated] = useState<boolean | undefined>();
  const [open, setOpen] = useState<boolean>(false);
  const menu: HTMLElement | null = document.getElementById('drawerMenu');

  const onClick = () => {
    if (!open && menu) {
      menu.style.left = '40vw';
    } else {
      if (menu) menu.style.left = '100vw';
    }
    setOpen(!open);
  };

  return (
    <div>
      <div
        className={styles.buttonContainer + (open ? ' ' + styles.close : '')}
        onClick={onClick}
        id="btnCnt"
      >
        <div className={styles.button}>
          <div className={styles.iconbar}></div>
          <div className={styles.iconbar}></div>
          <div className={styles.iconbar}></div>
        </div>
      </div>
      <div className={styles.sideDrawer} id="drawerMenu">
        <ul>
          <li>Login</li>
          <li>Sign Up</li>
        </ul>
      </div>
    </div>
  );
};

export default DropMenu;
