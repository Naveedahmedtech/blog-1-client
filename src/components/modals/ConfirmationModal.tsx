import { Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Button, useTheme } from '@mui/material';

const ConfirmationModal = ({ open, title, message, onConfirm, onCancel }:any) => {
    const theme = useTheme();

    return (
        <Dialog
            open={open}
            onClose={onCancel}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            sx={{
                '& .MuiDialog-container': {
                    '& .MuiPaper-root': {
                        width: '100%',
                        maxWidth: '400px', // Set a max-width for the modal
                        borderRadius: theme.shape.borderRadius, // Use theme's border radius
                    },
                },
            }}
        >
            <DialogTitle id="alert-dialog-title" sx={{ fontWeight: 'bold' }}>
                {title}
            </DialogTitle>
            <DialogContent dividers>
                <DialogContentText id="alert-dialog-description" sx={{ color: theme.palette.text.primary }}>
                    {message}
                </DialogContentText>
            </DialogContent>
            <DialogActions sx={{ padding: theme.spacing(2) }}>
                <Button onClick={onCancel} variant="outlined" color="primary" sx={{ marginRight: theme.spacing(1) }}>
                    Cancel
                </Button>
                <Button onClick={onConfirm} variant="contained" color="primary" autoFocus>
                    Confirm
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationModal;
