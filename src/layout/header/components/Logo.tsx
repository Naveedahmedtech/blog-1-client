// components/Logo.js
import Typography from '@mui/material/Typography';
import { Link } from 'react-router-dom';
import logo from '../../../assets/images/blog-logo-01.png'
// import your logo image here if you have one, otherwise use text

const Logo = () => {
    return (
        <Link to="/">
            <img src={logo} alt="" width={150} />
        </Link>
    );
};

export default Logo;

