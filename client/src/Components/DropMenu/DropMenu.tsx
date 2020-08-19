import React from 'react';
import styles from './DropMenu.module.scss';
import { Dropdown, Menu, Item, Trigger } from '@zendeskgarden/react-dropdowns';
import { Button } from '@zendeskgarden/react-buttons';
import { Row, Col } from '@zendeskgarden/react-grid';
import { ReactComponent as ChevronIcon } from '@zendeskgarden/svg-icons/src/16/chevron-down-stroke.svg';

const DropMenu: React.FC = () => (
  <div className={styles.DropMenu} data-testid="DropMenu">
    DropMenu Component
  </div>
);

export default DropMenu;
