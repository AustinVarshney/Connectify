import React, { useEffect, useState } from 'react'
import './DashNav.css'
import { Link, useNavigate } from 'react-router-dom'
import ConnectifyImg from '../../assets/Connectify.jpg'
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';
import RestoreIcon from '@mui/icons-material/Restore';
import { handleSuccess } from '../../utils';
import { ToastContainer } from 'react-toastify';

const DashNav = () => {
  const [open, setOpen] = React.useState(false);

  const navigate = useNavigate();

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('LoggedInUser');
    console.log("User Logged out");
    handleSuccess('User logged out successfully');
    setTimeout(() => {
      navigate('/');
    }, 1000);
  }

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} className='drawerBox'>
      <List>
        <ListItem disablePadding className='listItems'>
          <Link to={'/seeMeets'}>
            <ListItemButton>
              <ListItemText primary={'Recent Meets'} className='listItemText' />
            </ListItemButton>
          </Link>

        </ListItem >
        <ListItem disablePadding className='listItems'>
          <Link onClick={handleLogout}>
            <ListItemButton>
              <ListItemText primary={'Logout'} className='listItemText' />
            </ListItemButton>
          </Link>

        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className='outerDashNav1'>
      <div className='outerNav1'>
        <div className='innerNav1'>
          <img src={ConnectifyImg} alt="LogoImg" />
        </div>
        <div className='innerNav2'>
          <Link className='innerNavLink1' to={'/seeMeets'}><RestoreIcon />Recent Meets</Link>
          <Link><button onClick={handleLogout}>Logout</button></Link>
        </div>
        <div className='innerNav3'>
          <Button onClick={toggleDrawer(true)} style={{ marginTop: '-0.35rem' }}><MenuIcon style={{ fontSize: "2rem", color: "#5656f3" }} /></Button>
          <Drawer open={open} onClose={toggleDrawer(false)} className='drawer'>
            {DrawerList}
          </Drawer>
        </div>
      </div>
      <ToastContainer/>
    </div>
  )
}

export default DashNav
