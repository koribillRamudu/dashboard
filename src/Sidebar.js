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
<<<<<<< HEAD
            <DashboardIcon />
=======
            <DashboardIcon sx={{ fontSize: '30px', color: 'black' }} />
>>>>>>> c81057d84e1efe69b3de031e9493827b4cf64f43
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/students">
          <ListItemIcon>
<<<<<<< HEAD
            <PeopleIcon />
=======
            <PeopleIcon sx={{ fontSize: '30px', color: 'black' }} />
>>>>>>> c81057d84e1efe69b3de031e9493827b4cf64f43
          </ListItemIcon>
          <ListItemText primary="Students" />
        </ListItem>
        <ListItem button component={Link} to="/applications">
          <ListItemIcon>
<<<<<<< HEAD
            <DescriptionIcon />
=======
            <DescriptionIcon sx={{ fontSize: '30px', color: 'black' }} />
>>>>>>> c81057d84e1efe69b3de031e9493827b4cf64f43
          </ListItemIcon>
          <ListItemText primary="Applications" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
