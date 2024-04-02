import React from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard as DashboardIcon, People as PeopleIcon, Description as DescriptionIcon } from '@mui/icons-material';
import './Sidebar.css';

function Sidebar() {
  return (
    <Drawer variant="permanent" anchor="left" className="sidebar"> {/* Added class for Sidebar styling */}
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <DashboardIcon sx={{ fontSize: '30px',color:'black' }}/>
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/students">
          <ListItemIcon>
            <PeopleIcon sx={{ fontSize: '30px',color:'black' }}/>
          </ListItemIcon>
          <ListItemText primary="Students" />
        </ListItem>
          <ListItem button component="a" href="https://ramudu9054.github.io/resumebuliderapp/page1.html" target="_blank" rel="noopener noreferrer">
          <ListItemIcon>
            <DescriptionIcon sx={{ fontSize: '30px',color:'black' }}/>
          </ListItemIcon>
          <ListItemText primary="Applications" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
