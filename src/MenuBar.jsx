import React from 'react';
import { Menu } from 'semantic-ui-react'

const MenuBar = () => {
  return (
    <Menu secondary>
      <Menu.Menu position='right'>
        <Menu.Item>
          About
        </Menu.Item>

        <Menu.Item>
          Contact
        </Menu.Item>

        <Menu.Item>
          Subscribe
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
};

export default MenuBar;
