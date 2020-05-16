import React from 'react';
import { Menu, Image, Dropdown } from 'semantic-ui-react';
import { Link } from 'react-router-dom'

const SignedInMenu = ({signOut, profile, currentStore}) => {
  return (
    <Menu.Item position="right">
      <Image avatar spaced="right" src={profile.avatarUrl || "/assets/user.png"} />
      <Dropdown pointing="top left" text={profile.displayName}>
        <Dropdown.Menu>
          <Dropdown.Item as={Link} to={`/${currentStore}/cart`} text="My Bag" icon="shopping bag" />
          <Dropdown.Item as={Link} to={`/${currentStore}/my-account/order-history`} text="Order History" icon="list alternate outline" />
          <Dropdown.Item as={Link} to={`/${currentStore}/my-account/edit-profile`}text="My Profile" icon="user" />
          <Dropdown.Item as={Link} to={`/${currentStore}/my-account/edit-profile-facebook`} text="My Account" icon="settings" />
          <Dropdown.Item onClick={signOut} text="Sign Out" icon="power" />
        </Dropdown.Menu>
      </Dropdown>
    </Menu.Item>
  );
};

export default SignedInMenu;
