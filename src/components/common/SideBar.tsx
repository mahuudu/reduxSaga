import * as React from 'react';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import FingerprintIcon from '@mui/icons-material/Fingerprint';
import { Link } from 'react-router-dom';



export const mainListItems = (
  <React.Fragment>
    <Link to="/admin/dashboard">
    <ListItemButton>
      <ListItemIcon>
        <DashboardIcon />
      </ListItemIcon>
      <ListItemText primary="Dashboard" />
    </ListItemButton>
    </Link>
    <Link to="/admin/student">
    <ListItemButton>
      <ListItemIcon>
        <ShoppingCartIcon />
      </ListItemIcon>
      <ListItemText primary="List" />
    </ListItemButton>
    </Link>
    <Link to="/admin/numerology ">
    <ListItemButton>
      <ListItemIcon>
        <FingerprintIcon />
      </ListItemIcon>
      <ListItemText primary="Numerology" />
    </ListItemButton>
    </Link>
  </React.Fragment>
);
