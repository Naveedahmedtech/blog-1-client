import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea } from '@mui/material';

interface CardCustomProps {
    image: string;
    title: string;
    description: string;
    height: string;
}

const MAX_DESCRIPTION_LENGTH = 100; // Define a maximum length for the description

const CardCustom: React.FC<CardCustomProps> = ({ image, title, description, height }) => {
    // Truncate long descriptions
    const truncatedDescription = description.length > MAX_DESCRIPTION_LENGTH
        ? `${description.substring(0, MAX_DESCRIPTION_LENGTH)}...`
        : description;

    return (
        <Card style={{ height: "100%" }}>
            <CardActionArea>
                <CardMedia
                    component="img"
                    height={height}
                    image={image}
                    alt="Image"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                        {truncatedDescription}
                    </Typography>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default CardCustom;
