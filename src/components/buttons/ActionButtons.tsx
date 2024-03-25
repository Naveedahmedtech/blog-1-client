import { IconButton, Tooltip } from '@mui/material';
import InfoIcon from '@mui/icons-material/Info';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


const ActionButtons = ({ row, navigate, handleOpenModal }: any) => {
    return (
        <>
            <Tooltip title="Details">
                <IconButton onClick={() => navigate(`/posts/${row._id}`)} color="primary">
                    <InfoIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Update">
                <IconButton onClick={() => navigate(`/update-blogs/${row._id}`)} sx={{ color: 'orange' }}>
                    <EditIcon />
                </IconButton>
            </Tooltip>
            <Tooltip title="Delete">
                <IconButton onClick={() => handleOpenModal(row._id)} color="error">
                    <DeleteIcon />
                </IconButton>
            </Tooltip>
        </>
    );
};

export default ActionButtons;
