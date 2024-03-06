import { CircularProgress } from '@mui/material';

const ActionButton = ({ actionText, isLoading }: any) => {
    return (
        <button
            type="submit"
            className='custom-btn btn'
        >
            {isLoading ? <CircularProgress size={24} /> : actionText}
        </button>
    );
};

export default ActionButton;
