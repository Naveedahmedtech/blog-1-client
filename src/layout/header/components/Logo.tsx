// components/Logo.js
import Typography from '@mui/material/Typography';
// import your logo image here if you have one, otherwise use text

const Logo = () => {
    return (
        <Typography variant="h6" component="div" sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            Logo {/* Replace this with your image or SVG logo if available */}
        </Typography>
    );
};

export default Logo;

