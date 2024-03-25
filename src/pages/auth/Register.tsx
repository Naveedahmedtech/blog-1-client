import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Card, CardContent, Typography, Container, Snackbar, Alert, Link as MuiLink } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { AccountCircle } from '@mui/icons-material';
import FormInputField from '../../components/form/FormInputField';
import ActionButton from './components/LoginButton';
import { useRegisterMutation } from '../../redux/features/authApi';
import { Link, useNavigate } from 'react-router-dom';

const validationSchema = yup.object({
    username: yup.string().required('Username is required'),
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
});

const Register = () => {
    const navigate = useNavigate();
    const [register, { isLoading }] = useRegisterMutation();
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');

    const formik = useFormik({
        initialValues: {
            username: '',
            email: '',
            password: '',
        },
        validationSchema: validationSchema,
        onSubmit: async (values) => {
            try {
                await register(values).unwrap();
                navigate('/login');
            } catch (error: any) {
                // Assuming error is structured as shown in your example
                const message = error.data?.message?.message || 'Failed to register. Please try again later.';
                setSnackbarMessage(message);
                setOpenSnackbar(true);
            }
        },
    });

    const handleCloseSnackbar:any = (reason:any) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpenSnackbar(false);
    };

    return (
        <Container component="main" maxWidth="sm" sx={{ position: 'relative' }}>
            <Snackbar open={openSnackbar} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleCloseSnackbar} severity="error" sx={{ width: '100%' }}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
            <Card sx={{ minWidth: 275, boxShadow: 3, p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'auto', maxHeight: '90vh', mt: 8 }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <AccountCircle sx={{ fontSize: 60, my: 2, color: 'primary.main' }} />
                    <Typography variant="h5" component="h2" gutterBottom>
                        Register
                    </Typography>
                    <form onSubmit={formik.handleSubmit} style={{ width: '100%' }} noValidate>
                        <FormInputField name="username" label="Username" type="text" icon={<AccountCircle />} formik={formik} />
                        <FormInputField name="email" label="Email Address" type="email" icon={<EmailIcon />} formik={formik} />
                        <FormInputField name="password" label="Password" type="password" icon={<LockIcon />} formik={formik} />
                        <ActionButton actionText="Register" isLoading={isLoading} />
                    </form>
                </CardContent>
                <Typography variant="body2" sx={{ mt: 2 }}>
                    Already have an account? <MuiLink component={Link} to="/login">Login</MuiLink>
                </Typography>
            </Card>
        </Container>
    );
};

export default Register;
