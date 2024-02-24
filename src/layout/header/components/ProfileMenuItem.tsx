import React from 'react';
import { MenuItem, ListItemIcon, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../../hooks/useAuth';

const ProfileMenuItem = ({ icon, text, path }: { icon: React.ReactNode; text: string; path: string }) => {
    const navigate = useNavigate();
    const { logout } = useAuth(); // Destructure the logout function from useAuth

    const handleItemClick = () => {
        if (path === '/logout') {
            logout(); 
        } else {
            navigate(path); 
        }
    };

    return (
        <MenuItem onClick={handleItemClick}>
            <ListItemIcon>{icon}</ListItemIcon>
            <Typography variant="inherit">{text}</Typography>
        </MenuItem>
    );
};

export default ProfileMenuItem;

