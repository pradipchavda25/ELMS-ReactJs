import React, { useEffect, useState } from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import LoginIcon from '@mui/icons-material/Login';
import { Outlet, Link } from "react-router-dom";
import axios from 'axios';
import './layout.css'
import Footer from '../components/Footer';
import { useNavigate } from "react-router-dom";
import { useAuthContext } from "../authentication/context/AuthContext";
import { removeToken } from '../authentication/helper';
import PersonIcon from '@mui/icons-material/Person';
import Badge from '@mui/material/Badge';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
const pages = [
  { label: 'Home', path: '/' },
  { label: 'Courses', path: '/courses' },
  { label: 'Blogs', path: '/blogs' },
  { label: 'About Us', path: '/aboutus' },
  { label: 'Contact Us', path: '/contactus' },
];

function Header() {
  const [anchorElNav, setAnchorElNav] = React.useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const { user } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = () => {
    handleCloseNavMenu();
    removeToken();
    navigate("/", { replace: true });
    window.location.reload();
  };

  const [courses, setCourses] = useState([]);

  const CartItems = courses.length;
  useEffect(() => {
    axios
      .get("http://localhost:1337/api/my-courses?populate=%2A")
      .then((response) => {
        const data = response.data.data;
        setCourses(data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    handleCloseNavMenu();
    setAnchorEl(null);
  };

  return (
    <><AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Typography
            variant="h6"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'none', md: 'flex' },
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to='/' className='title-color'>
              <span className='title-e'>E-</span>LEARNING
            </Link>
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {pages.map((page) => (
                <Link to={page.path}>
                  <MenuItem key={page.label} onClick={handleCloseNavMenu}>
                    <Typography textAlign="center">
                      {page.label}
                    </Typography>
                  </MenuItem>
                </Link>
              ))}
              {user ? (
                <>
                  <Link to='/purchase-courses'>
                    <MenuItem onClick={handleCloseNavMenu}>
                      <Typography textAlign="center">
                        My Courses
                      </Typography>
                    </MenuItem>
                  </Link>
                  <Button
                    variant="outlined"
                    className='login-btn'
                    id="basic-button"
                    aria-controls={open ? 'basic-menu' : undefined}
                    aria-haspopup="true"
                    aria-expanded={open ? 'true' : undefined}
                    onClick={handleClick}

                  >
                    <PersonIcon />  &nbsp;{user.username}
                  </Button>
                  <Menu
                    id="basic-menu"
                    anchorEl={anchorEl}
                    open={open}
                    onClose={handleClose}
                    MenuListProps={{
                      'aria-labelledby': 'basic-button',
                    }}
                  >
                    <Link to='/profile' className='btns'>
                      <MenuItem onClick={handleClose}>Profile</MenuItem>

                    </Link>
                    <Link to='/' className='btns' onClick={handleLogout}>
                      <MenuItem onClick={handleClose}>Logout</MenuItem>
                    </Link>
                  </Menu> <br />
                  <Link to='/mycourses' className='cartBtn'>
                    <Button
                      onClick={handleCloseNavMenu}
                      sx={{ color: 'white', display: 'block' }}
                    >
                      <IconButton aria-label="cart">
                        <Badge badgeContent={CartItems} color="primary">
                          <ShoppingCartIcon sx={{ color: 'black', display: 'block' }} />
                        </Badge>
                      </IconButton>
                    </Button>
                  </Link>
                </>
              ) : (
                <Link to='/login'>
                  <Button className='login-btn' variant="outlined" onClick={handleCloseNavMenu}>
                    Login
                  </Button>
                </Link>
              )}
            </Menu>
          </Box>
          <Typography
            variant="h5"
            noWrap
            component="a"
            href=""
            sx={{
              mr: 2,
              display: { xs: 'flex', md: 'none' },
              flexGrow: 1,
              fontFamily: 'monospace',
              fontWeight: 700,
              letterSpacing: '.3rem',
              color: 'inherit',
              textDecoration: 'none',
            }}
          >
            <Link to='/' className='title-color'>
              <span className='title-e'>E-</span>LEARNING
            </Link>
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {pages.map((page) => (
              <Link to={page.path}>
                <Button
                  key={page.label}
                  onClick={handleCloseNavMenu}
                  sx={{ my: 2, color: 'white', display: 'block' }}
                >
                  {page.label}
                </Button>
              </Link>
            ))}
            {user ? (
              <>
                <Link to='/purchase-courses'>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ my: 2, color: 'white', display: 'block' }}
                  >
                    MY COURSES
                  </Button>
                </Link>&nbsp;&nbsp;
                <Button
                  variant="outlined"
                  className='login-btn'
                  id="basic-button"
                  aria-controls={open ? 'basic-menu' : undefined}
                  aria-haspopup="true"
                  aria-expanded={open ? 'true' : undefined}

                >
                  <PersonIcon />  &nbsp;{user.username} &nbsp; <ArrowDropDownIcon onClick={handleClick} />
                </Button>
                <Menu
                  id="basic-menu"
                  anchorEl={anchorEl}
                  open={open}
                  onClose={handleClose}
                  MenuListProps={{
                    'aria-labelledby': 'basic-button',
                  }}
                >
                  <Link to='/profile' className='btns'>
                    <MenuItem onClick={handleClose}>Profile</MenuItem>

                  </Link>
                  <Link to='/' className='btns' onClick={handleLogout}>
                    <MenuItem onClick={handleClose}>Logout</MenuItem>
                  </Link>
                </Menu>
                <Link to='/mycourses'>
                  <Button
                    onClick={handleCloseNavMenu}
                    sx={{ color: 'white', display: 'block' }}
                  >
                    <IconButton aria-label="cart">
                      <Badge badgeContent={CartItems} color="primary">
                        <ShoppingCartIcon sx={{ color: 'white', display: 'block' }} />
                      </Badge>
                    </IconButton>
                  </Button>
                </Link>&nbsp;
              </>
            ) : (
              <Link to='/login' className='btns'>
                <Button className='login-btn' variant="outlined" onClick={handleCloseNavMenu} endIcon={<LoginIcon />}>
                  Login
                </Button>
              </Link>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar> <br />
      <Outlet />
      <Footer />
    </>
  );
}
export default Header;
