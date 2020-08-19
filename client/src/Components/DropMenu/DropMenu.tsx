import React, { useState } from 'react';
import styles from './DropMenu.module.scss';
import { Dropdown, Menu, Item, Trigger } from '@zendeskgarden/react-dropdowns';
import { Button } from '@zendeskgarden/react-buttons';
import { Row, Col } from '@zendeskgarden/react-grid';
import { ReactComponent as ChevronIcon } from '@zendeskgarden/svg-icons/src/16/chevron-down-stroke.svg';
import hamburger from '../../Images/open-menu.svg';

const DropMenu: React.FC = () => {
  const [rotated, setRotated] = useState<boolean | undefined>();

  return (
    <Row>
      <Col textAlign="center">
        <Dropdown
          onSelect={(item) => alert(`You planted a ${item}`)}
          onStateChange={(options) =>
            Object.prototype.hasOwnProperty.call(options, 'isOpen') && setRotated(options.isOpen)
          }
        >
          <Trigger>
            <Button>
              Choose succulent
              <Button.EndIcon isRotated={rotated}>
                <img src={hamburger} alt="hamburger" />
              </Button.EndIcon>
            </Button>
          </Trigger>
          <Menu>
            <Item value="cactus">Cactus</Item>
            <Item value="jade">Jade plant</Item>
            <Item value="echeveria">Echeveria</Item>
          </Menu>
        </Dropdown>
      </Col>
    </Row>
  );
};

export default DropMenu;
