import React, { useState, useEffect } from 'react';
import styles from './DropMenu.module.scss';

const DropMenu: React.FC = () => {
  const userObject = JSON.parse(localStorage.getItem('userInformation') || '{}');
  const [open, setOpen] = useState<boolean>(false);
  let menu: HTMLElement;

  useEffect(() => {
    menu = document.getElementById('drawerMenu') as HTMLElement;
  }, [open]);

  const onClick = () => {
    if (!open && menu) {
      menu.style.left = '40vw';
    } else {
      if (menu) menu.style.left = '100vw';
    }
    setOpen(!open);
  };

  const handleLogout = () => localStorage.clear();

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
          <li>
            <a href="/">Home</a>
          </li>
          {userObject.hasOwnProperty('email') ? (
            ''
          ) : (
            <li>
              <a href="/user/login">Login</a>
            </li>
          )}
          {userObject.hasOwnProperty('email') ? (
            ''
          ) : (
            <li>
              <a href="/user/signup">Sign Up</a>
            </li>
          )}
          <li>
            <a href="/board">Events</a>
          </li>
          {userObject.hasOwnProperty('email') ? (
            <li>
              <a href="/newevent/">Create Event</a>
            </li>
          ) : (
            ''
          )}
          {userObject.hasOwnProperty('email') ? (
            <li>
              <a href="/user/profile">Profile</a>
            </li>
          ) : (
            ''
          )}
          {userObject.hasOwnProperty('email') ? (
            <li>
              <a onClick={handleLogout} href="/">
                Log out
              </a>
            </li>
          ) : (
            ''
          )}
        </ul>
      </div>
    </div>
  );
};

export default DropMenu;
