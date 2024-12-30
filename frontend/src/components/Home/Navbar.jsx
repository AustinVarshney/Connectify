import React from 'react'
import './Navbar.css'
import { Link } from 'react-router-dom'
import ConnectifyImg from '../../assets/Connectify.jpg'
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemText from '@mui/material/ListItemText';

const Navbar = () => {
  const [open, setOpen] = React.useState(false);

  const toggleDrawer = (newOpen) => () => {
    setOpen(newOpen);
  };

  const DrawerList = (
    <Box sx={{ width: 250 }} role="presentation" onClick={toggleDrawer(false)} className='drawerBox'>
      <List>
        <ListItem disablePadding className='listItems'>
          <Link to='/login'>
            <ListItemButton>
              <ListItemText primary={'Login'} className='listItemText'/>
            </ListItemButton>
          </Link>

        </ListItem >
        <ListItem disablePadding className='listItems'>
          <Link to='/signup'>
            <ListItemButton>
              <ListItemText primary={'Signup'}  className='listItemText'/>
            </ListItemButton>
          </Link>

        </ListItem>
      </List>
    </Box>
  );

  return (
    <div className='outerNav1'>
      <div className='innerNav1'>
        <Link to='/'>
          <img src={ConnectifyImg} alt="LogoImg" />
        </Link>
        
      </div>
      <div className='innerNav2'>
        <Link to={'/login'}><button>Login</button></Link>
        <Link to={'/signup'}><button>Signup</button></Link>
      </div>
      <div className='innerNav3'>
        <Button onClick={toggleDrawer(true)} style={{marginTop: '-0.35rem'}}><MenuIcon style={{ fontSize: "2rem", color: "#5656f3" }} /></Button>
        <Drawer open={open} onClose={toggleDrawer(false)} className='drawer'>
          {DrawerList}
        </Drawer>
      </div>
    </div>
  )
}

export default Navbar
