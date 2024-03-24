import React, { useState } from 'react';
import { TextField, Button, Box, CircularProgress, Alert } from '@mui/material';
import { useChangePasswordMutation } from '../../../redux/features/authApi';
import { useAuth } from '../../../hooks/useAuth';
import { decodeToken } from '../../../utils/tokens';

const PasswordForm = () => {
    const [oldPassword, setOldPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmNewPassword, setConfirmNewPassword] = useState('');
    const [feedbackMsg, setFeedbackMsg] = useState('');
    const [feedbackType, setFeedbackType] = useState('info'); // 'success', 'error', 'info'
    const { userData, } = useAuth(); // Ensure you're destructuring updateToken here
    const user = decodeToken(userData) as any;
    const id = user?.sub;

    const [changePassword, { isLoading, isSuccess, isError, error }] = useChangePasswordMutation();

    const handleSubmit = async (event) => {
        event.preventDefault();
        if (newPassword !== confirmNewPassword) {
            setFeedbackMsg('New passwords do not match.');
            setFeedbackType('error');
            return;
        }

        try {
            await changePassword({ id, oldPassword, newPassword }).unwrap();
            setFeedbackMsg('Password updated successfully.');
            setFeedbackType('success');
            // Clear the form
            setOldPassword('');
            setNewPassword('');
            setConfirmNewPassword('');
        } catch (err) {
            // Handle API error here
            setFeedbackMsg(error?.data?.message || 'Failed to update password. Please try again.');
            setFeedbackType('error');
        }
    };

    return (
        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 2 }}>
            <h3>Change Password</h3>
            {feedbackMsg && (
                <Alert severity={feedbackType} sx={{ mb: 2 }}>
                    {feedbackMsg}
                </Alert>
            )}
            <TextField
                type="password"
                label="Old Password"
                variant="outlined"
                value={oldPassword}
                onChange={(e) => setOldPassword(e.target.value)}
                fullWidth
                required
                margin="normal"
                disabled={isLoading}
            />
            <TextField
                type="password"
                label="New Password"
                variant="outlined"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
                fullWidth
                required
                margin="normal"
                disabled={isLoading}
            />
            <TextField
                type="password"
                label="Confirm New Password"
                variant="outlined"
                value={confirmNewPassword}
                onChange={(e) => setConfirmNewPassword(e.target.value)}
                fullWidth
                required
                margin="normal"
                disabled={isLoading}
            />
            <Button type="submit" variant="contained" sx={{ mt: 1 }} disabled={isLoading}>
                {isLoading ? <CircularProgress size={24} /> : 'Update Password'}
            </Button>
        </Box>
    );
};

export default PasswordForm;
