import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard as DashboardIcon, People as PeopleIcon, Description as DescriptionIcon } from '@mui/icons-material';
import './Sidebar.css';

function Sidebar() {
  return (
    <Drawer variant="permanent" anchor="left" className="sidebar">
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <DashboardIcon sx={{ fontSize: '30px', color: 'black' }} />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/students">
          <ListItemIcon>
            <PeopleIcon sx={{ fontSize: '30px', color: 'black' }} />
          </ListItemIcon>
          <ListItemText primary="Students" />
        </ListItem>
        {/* Use Link component for the "Applications" link */}
        <ListItem button component={Link} to="/applications">
          <ListItemIcon>
            <DescriptionIcon sx={{ fontSize: '30px', color: 'black' }} />
          </ListItemIcon>
          <ListItemText primary="Applications" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
