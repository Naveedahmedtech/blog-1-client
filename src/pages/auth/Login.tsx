import { useFormik } from 'formik';
import * as yup from 'yup';
import { Card, CardContent, Typography, Container } from '@mui/material';
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
    email: yup
        .string()
        .email('Enter a valid email')
        .required('Email is required'),
    password: yup
        .string()
        .min(8, 'Password should be of minimum 8 characters length')
        .required('Password is required'),
});

const Login = () => {
    const navigate = useNavigate();
    const { login: storeUser } = useAuth(); 
    
    const [login] = useLoginMutation();
    const formik = useFormik({
        initialValues: {
            email: '',
            password: '',
        },
        validationSchema,
        onSubmit: async (values:any) => {
            values.hashedPassword = values.password;
            delete values.password;
            // console.log(values);
            try {
                const response = await login(values).unwrap();
                const token = response.result.accessToken
                storeUser(token)
                navigate('/')
            } catch (error) {
                console.log(error);
            }
        },
    });



    return (
        <Container component="main" maxWidth="sm" sx={{
            display: 'flex', justifyContent: 'center', alignItems: 'center', height: '100vh',
            padding: 0, // Remove padding to ensure content fits without scroll
            margin: 'auto', // Centering the card vertically might need adjustments based on the card size
            '& .MuiContainer-root': {
                maxHeight: '100vh', // Ensure the container does not exceed the viewport height
                overflow: 'hidden', // Hide overflow to prevent scrollbar appearance
            }
        }}>
            <Card sx={{
                minWidth: 275,
                boxShadow: 3,
                p: 4,
                borderRadius: 2,
                backgroundColor: 'rgba(255, 255, 255, 0.8)',
                display: 'flex', // This ensures the content is flexibly arranged
                flexDirection: 'column', // Stack children vertically
                justifyContent: 'center', // Center content vertically in the card
                overflow: 'auto', // Adjusts for small viewports, but consider removing if unnecessary
                maxHeight: '90vh', // Prevent card from getting too tall on small screens
            }}>
                <CardContent sx={{
                    display: 'flex', flexDirection: 'column', alignItems: 'center',
                }}>
                    <AccountCircle sx={{ fontSize: 60, my: 2, color: 'primary.main' }} />
                    <Typography variant="h5" component="h2" gutterBottom sx={{ color: 'text.primary' }}>
                        Sign in
                    </Typography>
                    <form onSubmit={formik.handleSubmit} style={{ width: '100%' }} noValidate>
                        <FormInputField name="email" label="Email Address" type="email" icon={<EmailIcon />} formik={formik} />
                        <FormInputField name="password" label="Password" type="password" icon={<LockIcon />} formik={formik} />
                        <ActionButton actionText="Sign in" />
                        <ForgotPasswordLink />
                        <>
                        <Link to="/register">Sign up</Link>
                        </>
                    </form>
                </CardContent>
            </Card>
        </Container>
    );
};

export default Login;
