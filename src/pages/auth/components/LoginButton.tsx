import { Button } from '@mui/material';

const ActionButton = ({ actionText } : any) => {
    return (
        <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
            {actionText}
        </Button>
    );
};

export default ActionButton;
