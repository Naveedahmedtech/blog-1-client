import React, { useState } from 'react';
import { TextField, InputAdornment, IconButton } from '@mui/material';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import LockIcon from '@mui/icons-material/Lock';
import EmailIcon from '@mui/icons-material/Email'; // Import EmailIcon

const FormInputField = ({ name, label, type, formik } : any) => {
    const [showPassword, setShowPassword] = useState(false);

    // Toggle visibility of the password
    const togglePasswordVisibility = () => setShowPassword(!showPassword);

    const getInputAdornments = () => {
        switch (type) {
            case 'email':
                return {
                    startAdornment: (
                        <InputAdornment position="start">
                            <EmailIcon />
                        </InputAdornment>
                    ),
                };
            case 'password':
                return {
                    startAdornment: (
                        <InputAdornment position="start">
                            <LockIcon />
                        </InputAdornment>
                    ),
                    endAdornment: (
                        <InputAdornment position="end">
                            <IconButton
                                aria-label="toggle password visibility"
                                onClick={togglePasswordVisibility}
                                edge="end"
                            >
                                {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                        </InputAdornment>
                    ),
                };
            default:
                return {};
        }
    };

    return (
        <TextField
            margin="normal"
            fullWidth
            id={name}
            name={name}
            label={label}
            type={showPassword ? 'text' : type}
            autoComplete={type}
            autoFocus={type === 'email'}
            InputProps={getInputAdornments()}
            value={formik.values[name]}
            onChange={formik.handleChange}
            error={formik.touched[name] && Boolean(formik.errors[name])}
            helperText={formik.touched[name] && formik.errors[name]}
        />
    );
};

export default FormInputField;
