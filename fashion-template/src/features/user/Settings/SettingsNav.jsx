import React from 'react';
import { Grid, Menu, Header } from 'semantic-ui-react';
import { NavLink } from 'react-router-dom'

const SettingsNav = ({currentStore}) => {
  return (
    <Grid.Column width={4}>
      <Menu pointing secondary vertical>
        <Menu.Item as={NavLink} to={`/${currentStore}/my-account/order-history`}>Order History</Menu.Item>
        <Menu.Item as={NavLink} to={`/${currentStore}/cart`}>My Bag</Menu.Item>
        <Menu.Item as={NavLink} to={`/${currentStore}/my-account/edit-profile`}>Basic Details</Menu.Item>
        <Menu.Item as={NavLink} to={`/${currentStore}/my-account/edit-profile-facebook`}>Account Details</Menu.Item>
      </Menu>
    </Grid.Column>
  );
};

export default SettingsNav;
