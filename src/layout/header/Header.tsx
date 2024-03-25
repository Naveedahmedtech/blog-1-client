// components/HideAppBar.js
import { useState } from 'react';
import { AppBar, Toolbar, CssBaseline, IconButton, useTheme, useMediaQuery, Drawer } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Navigation from './components/Navigation';
import Logo from './components/Logo';
import HideOnScroll from './components/HideOnScroll';
import { Outlet } from 'react-router-dom';

const HideAppBar = () => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const toggleDrawer = (open: any) => (event: any) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }
    setMobileMenuOpen(open);
  };



  return (
    <>
      <CssBaseline />
      <HideOnScroll>
        <AppBar >
          <Toolbar sx={{ display: 'flex', justifyContent: "space-between", alignItems: "center", background: "#000" }}>
            <Logo />
            {!isMobile && (
              <>
                <Navigation is_mobile={false} setMobileMenuOpen={setMobileMenuOpen} />
              
              </>
            )}
            {isMobile && (
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="end"
                onClick={toggleDrawer(true)}
              >
                <MenuIcon />
              </IconButton>
            )}
          </Toolbar>
        </AppBar>
      </HideOnScroll>
      <Toolbar />
      {/* <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#000',
            color: '#fff',
            width: 250
          }
        }}
      >
        <Box
          role="presentation"
        // onClick={toggleDrawer(false)}
        // onKeyDown={toggleDrawer(false)}
        >
          <Navigation is_mobile={true} setMobileMenuOpen={setMobileMenuOpen} />
        </Box>
      </Drawer> */}
      <Drawer
        anchor="right"
        open={mobileMenuOpen}
        onClose={toggleDrawer(false)}
        PaperProps={{
          sx: {
            backgroundColor: '#000',
            color: '#fff',
            width: 250,
            transition: 'width 0.5s ease',
          }
        }}
      >
        {/* Improved navigation accessibility */}
        <nav role="presentation">
          <Navigation is_mobile={true} setMobileMenuOpen={setMobileMenuOpen} />
        </nav>
      </Drawer>

      <Outlet />
    </>
  );
};

export default HideAppBar;
