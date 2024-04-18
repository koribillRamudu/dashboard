import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Drawer, List, ListItem, ListItemIcon, ListItemText } from '@mui/material';
import { Dashboard as DashboardIcon, People as PeopleIcon, Description as DescriptionIcon } from '@mui/icons-material';
import './Sidebar.css';

function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Open the sidebar if the mouse is within 50 pixels of the left edge
      setIsOpen(e.clientX < 50);
    };

    // Add mouse move event listener
    document.addEventListener('mousemove', handleMouseMove);

    // Cleanup the event listener on component unmount
    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      className={`sidebar ${isOpen ? 'open' : ''}`}
      onMouseLeave={() => setIsOpen(false)} // Hide sidebar when mouse leaves
      ModalProps={{
        keepMounted: true, // Better open performance on mobile.
      }}
    >
      <List>
        <ListItem button component={Link} to="/">
          <ListItemIcon>
            <DashboardIcon />
          </ListItemIcon>
          <ListItemText primary="Dashboard" />
        </ListItem>
        <ListItem button component={Link} to="/applications">
          <ListItemIcon>
            <DescriptionIcon />
          </ListItemIcon>
          <ListItemText primary="Applications" />
        </ListItem>
        <ListItem button component={Link} to="/students">
          <ListItemIcon>
            <PeopleIcon />
          </ListItemIcon>
          <ListItemText primary="Payments" />
        </ListItem>
      </List>
    </Drawer>
  );
}

export default Sidebar;
