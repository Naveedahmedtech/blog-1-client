import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Chip } from '@mui/material';
import TextComponent from '../text/TextComponent';
import { truncatedDescription } from '../../utils/text.utils';
import './cardCustom.css';
import { BASE_URL } from '../../../baseUrl';


interface Tag {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

// interface Tags {
//     id: string;
//     postId: string;
//     tagId: string;
//     tag: Tag;
// }

interface CardCustomProps {
    image: string;
    title: string;
    description: string;
    height: string;
    author: string;
    tags?: Tag[];
    category: string;
    page?: string;
}

const CardCustom: React.FC<CardCustomProps> = ({ image, title, description, height, author, tags, category, page }) => {
    console.log(author);
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
                            {tags?.map((tagObject, index) => (
                                <Typography key={index} variant="body2" color="text.secondary" component="span">
                                    {tagObject?.name} {' '}
                                </Typography>
                            ))}
                        </div>
                    )}
                    <Chip label={category} size="small" sx={{ my: 1 }} />
                    <div style={{ display: "flex", margin: "10px 0" }}>
                        <TextComponent>Author: </TextComponent>
                        <TextComponent fontWeight="bold">{author || "Unknown"}</TextComponent>
                    </div>
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
