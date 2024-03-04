// components/HideOnScroll.js
import { useScrollTrigger, Slide } from '@mui/material';
import React from 'react';


interface Props {
    children: React.ReactNode;
    window: any;
}
const HideOnScroll = ({ children, window }: Props) => {
    const trigger = useScrollTrigger({ target: window ? window() : undefined });

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children as React.ReactElement}
        </Slide>
    );
};

export default HideOnScroll;
