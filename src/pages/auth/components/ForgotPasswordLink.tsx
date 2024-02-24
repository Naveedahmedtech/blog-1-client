import { Grid, Link } from '@mui/material';

const ForgotPasswordLink = () => {
    return (
        <Grid container justifyContent="flex-end">
            <Grid item>
                <Link href="#" variant="body2">
                    Forgot password?
                </Link>
            </Grid>
        </Grid>
    );
};

export default ForgotPasswordLink;
