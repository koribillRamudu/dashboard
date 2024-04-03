import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard as DashboardIcon, People as PeopleIcon, Description as DescriptionIcon } from '@mui/icons-material';
import './Sidebar.css';

function Sidebar() {
  return (
    <Drawer variant="permanent" anchor="left" className="sidebar">
      <List>
        <ListItem button component={Link} to="/applications">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/students">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Students" />
        </ListItem>
        <ListItem button component={Link} to="/applications">
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Applications" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
