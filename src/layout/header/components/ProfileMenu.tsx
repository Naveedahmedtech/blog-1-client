import React from 'react';
import { IconButton, Menu } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import LogoutIcon from '@mui/icons-material/Logout';
import ProfileIcon from '@mui/icons-material/Person';
import AddBoxIcon from '@mui/icons-material/AddBox';
import DescriptionIcon from '@mui/icons-material/Description';
import ProfileMenuItem from './ProfileMenuItem'; // Import the new component

const ProfileMenu = () => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleProfileMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    };

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const isMenuOpen = Boolean(anchorEl);
    const menuId = 'primary-search-account-menu';

    return (
        <>
            <IconButton
                size="large"
                edge="end"
                aria-label="account of current user"
                aria-controls={menuId}
                aria-haspopup="true"
                onClick={handleProfileMenuOpen}
                color="inherit"
            >
                <AccountCircle />
            </IconButton>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={handleMenuClose}
            >
                <ProfileMenuItem icon={<ProfileIcon fontSize="small" />} text="Profile" path="/profile" />
                <ProfileMenuItem icon={<AddBoxIcon fontSize="small" />} text="Add Blogs" path="/add-blogs" />
                <ProfileMenuItem icon={<DescriptionIcon fontSize="small" />} text="My Blogs" path="/my-blogs" />
                <ProfileMenuItem icon={<LogoutIcon fontSize="small" />} text="Logout" path="/logout" />
            </Menu>
        </>
    );
};

export default ProfileMenu;
