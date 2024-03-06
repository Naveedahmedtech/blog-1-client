// components/HideOnScroll.tsx
import { useScrollTrigger, Slide } from '@mui/material';
import React from 'react';

interface Props {
    children: React.ReactNode;
}

const HideOnScroll = ({ children }: Props) => {
    const trigger = useScrollTrigger();

    return (
        <Slide appear={false} direction="down" in={!trigger}>
            {children as React.ReactElement}
        </Slide>
    );
};

export default HideOnScroll;
