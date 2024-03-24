import React, { useState } from 'react';
import { TextField, Button, Box, CircularProgress, Alert } from '@mui/material';
import { useUpdateUsernameMutation } from '../../../redux/features/authApi';
import { useAuth } from '../../../hooks/useAuth';
import { decodeToken } from '../../../utils/tokens';

const UsernameForm = () => {
    const { userData, updateToken } = useAuth(); // Ensure you're destructuring updateToken here
    const user = decodeToken(userData) as any;
    const id = user?.sub;
    const existingUsername = user?.username;
    const [username, setUsername] = useState(existingUsername ? existingUsername : '');
    const [updateUsername, { isLoading, isSuccess, isError, error }] = useUpdateUsernameMutation();
    const [feedbackMsg, setFeedbackMsg] = useState('');

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await updateUsername({ id: id, newUsername: username }).unwrap();
            const token = response.token;
            updateToken(token);
            setFeedbackMsg(`Username successfully updated to: ${username}`);
        } catch (err) {
            console.error('Failed to update username:', err);
            setFeedbackMsg('Failed to update username. Please try again.');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <h3>Change Username</h3>
            {feedbackMsg && (
                <Alert severity={isSuccess ? "success" : isError ? "error" : "info"}>
                    {feedbackMsg}
                </Alert>
            )}
            <TextField
                label="New Username"
                variant="outlined"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                fullWidth
                required
                margin="normal"
                disabled={isLoading}
            />
            <Button type="submit" variant="contained" sx={{ mt: 1 }} disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : 'Update Username'}
            </Button>
        </Box>
    );
};

export default UsernameForm;
