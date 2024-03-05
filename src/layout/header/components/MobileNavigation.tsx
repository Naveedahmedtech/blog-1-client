import { Box, Drawer, IconButton } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import Navigation from './Navigation';
import ProfileMenu from './ProfileMenu';

const MobileNavigation = ({ mobileMenuOpen, handleMobileMenuToggle } : any) => (
    <>
        <IconButton
            size="large"
            edge="end"
            color="inherit"
            aria-label="open drawer"
            onClick={handleMobileMenuToggle}
        >
            <MenuIcon />
        </IconButton>
        <Drawer
            anchor="right"
            open={mobileMenuOpen}
            onClose={handleMobileMenuToggle}
        >
            <Box
                sx={{ width: 250 }}
                role="presentation"
                onClick={handleMobileMenuToggle}
                onKeyDown={handleMobileMenuToggle}
            >
                <Navigation />
                <ProfileMenu />
            </Box>
        </Drawer>
    </>
);

export default MobileNavigation;
