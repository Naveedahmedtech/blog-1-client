import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { Badge, CardActionArea, Chip } from '@mui/material';
import TextComponent from '../text/TextComponent';
import { truncatedDescription } from '../../utlis/text.utils';
import './cardCustom.css';

interface CardCustomProps {
    image: string;
    title: string;
    description: string;
    height: string;
    author: string;
    tags?: string[];
    category: string;
}

const CardCustom: React.FC<CardCustomProps> = ({ image, title, description, height, author, tags, category }) => {

    return (
        <Card className="custom-card"
            style={{ height: "100%" }}
        >
            <CardActionArea>
                <CardMedia
                    component="img"
                    height={height}
                    image={image}
                    alt="Image"
                />
                <CardContent>
                    {tags && tags.length > 0 && (
                        <div>
                            {tags.map((tag, index) => (
                                <Typography key={index} variant="body2" color="text.secondary" component="span">
                                    {tag} {' '}
                                </Typography>
                            ))}
                        </div>
                    )}
                    <Chip label={category} size="small" sx={{ my: 1 }} />
                    <TextComponent sx={{ my: 1 }}>{author}</TextComponent>
                    <TextComponent gutterBottom variant="h5" component="div">
                        {title}
                    </TextComponent>
                    <TextComponent variant="body2" color="text.secondary">
                        {truncatedDescription(description)}
                    </TextComponent>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default CardCustom;
