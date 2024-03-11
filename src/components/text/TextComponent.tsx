import { Typography, TypographyProps } from '@mui/material';

interface TextComponentProps extends TypographyProps {
    children: React.ReactNode,
}

const TextComponent = ({
    children,
    ...typographyProps
}: TextComponentProps) => {
    return (
        <Typography {...typographyProps}>
            {children}
        </Typography>
    )
}

export default TextComponent
