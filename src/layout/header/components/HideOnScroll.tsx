// components/HideOnScroll.js
import { useScrollTrigger, Slide } from '@mui/material';

const HideOnScroll = ({ children, window }:any) => {
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children}
        </Slide>
    );
};

export default HideOnScroll;
