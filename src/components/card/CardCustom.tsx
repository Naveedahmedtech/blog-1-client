import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Chip } from '@mui/material';
import TextComponent from '../text/TextComponent';
import { truncatedDescription } from '../../utlis/text.utils';
import './cardCustom.css';


interface Tag {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

interface Tags {
    id: string;
    postId: string;
    tagId: string;
    tag: Tag;
}

interface CardCustomProps {
    image: string;
    title: string;
    description: string;
    height: string;
    author: string;
    tags?: Tags[];
    category: string;
    page?: string;
}

const CardCustom: React.FC<CardCustomProps> = ({ image, title, description, height, author, tags, category, page }) => {

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
                            {tags.map((tagObject, index) => (
                                <Typography key={index} variant="body2" color="text.secondary" component="span">
                                    {tagObject?.tag?.name} {' '}
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
                        {page === "detail" ? description : truncatedDescription(description)}
                    </TextComponent>
                </CardContent>
            </CardActionArea>
        </Card>
    );
}

export default CardCustom;
