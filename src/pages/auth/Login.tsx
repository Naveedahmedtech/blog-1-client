import { useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Card, CardContent, Typography, Container, Snackbar, Alert, Link as MuiLink } from '@mui/material';
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import { AccountCircle } from '@mui/icons-material';
import ForgotPasswordLink from './components/ForgotPasswordLink';
import FormInputField from '../../components/form/FormInputField';
import { Link, useNavigate } from 'react-router-dom';
import ActionButton from './components/LoginButton';
import { useLoginMutation } from '../../redux/features/authApi';
import { useAuth } from '../../hooks/useAuth';

const validationSchema = yup.object({
    email: yup.string().email('Enter a valid email').required('Email is required'),
    password: yup.string().min(8, 'Password should be of minimum 8 characters length').required('Password is required'),
});

const Login = () => {
    const navigate = useNavigate();
    const { login: storeUser } = useAuth();
    const [login, { isLoading }] = useLoginMutation();
    const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' }) as any;

    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values) => {
            try {
                const response = await login(values).unwrap();
                storeUser(response.result.accessToken);
                navigate('/');
            } catch (error:any) {
                setSnackbar({
                    open: true,
                    message: error.data?.message?.message || 'Failed to sign in. Please check your credentials and try again.',
                    severity: 'error',
                });
            }
        },
    });

    const handleCloseSnackbar:any = (reason:any)  => {
        if (reason === 'clickaway') {
            return;
        }
        setSnackbar({ ...snackbar, open: false });
    };

    return (
        <Container component="main" maxWidth="sm" sx={{ position: 'relative' }}>
            <Snackbar open={snackbar.open} autoHideDuration={6000} onClose={handleCloseSnackbar} anchorOrigin={{ vertical: 'top', horizontal: 'center' }}>
                <Alert onClose={handleCloseSnackbar} severity={snackbar.severity} sx={{ width: '100%' }}>
                    {snackbar.message}
                </Alert>
            </Snackbar>
            <Card sx={{ minWidth: 275, boxShadow: 3, p: 4, borderRadius: 2, backgroundColor: 'rgba(255, 255, 255, 0.8)', display: 'flex', flexDirection: 'column', justifyContent: 'center', overflow: 'auto', maxHeight: '90vh', mt: 8 }}>
                <CardContent sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                    <AccountCircle sx={{ fontSize: 60, my: 2, color: 'primary.main' }} />
                    <Typography variant="h5" component="h2" gutterBottom>
                        Sign in
                    </Typography>
                    <form onSubmit={formik.handleSubmit} style={{ width: '100%' }} noValidate>
                        <FormInputField name="email" label="Email Address" type="email" icon={<EmailIcon />} formik={formik} />
                        <FormInputField name="password" label="Password" type="password" icon={<LockIcon />} formik={formik} />
                        <ActionButton actionText="Sign in" isLoading={isLoading} />
                        <ForgotPasswordLink />
                        <Typography variant="body2" sx={{ mt: 2 }}>
                            Don't have an account? <MuiLink component={Link} to="/register">Sign up</MuiLink>
                        </Typography>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Login;
