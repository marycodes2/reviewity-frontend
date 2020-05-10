import React from 'react';
import { Menu } from 'semantic-ui-react'

const MenuBar = (props) => {
  return (
    <Menu secondary>
      <Menu.Menu position='right'>
        <Menu.Item>
          About
        </Menu.Item>

        <Menu.Item
          onClick={props.handleLogout}
        >
          Log out
        </Menu.Item>
      </Menu.Menu>
    </Menu>
  )
};

export default MenuBar;
