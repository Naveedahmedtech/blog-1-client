import React from 'react';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Typography from '@mui/material/Typography';
import { CardActionArea, Chip } from '@mui/material';
import TextComponent from '../text/TextComponent';
import { truncatedDescription } from '../../utils/text.utils';
import './cardCustom.css';
import { formatDate } from '../../utils/formatData';


interface Tag {
    id: string;
    name: string;
    createdAt: string;
    updatedAt: string;
}

interface CardCustomProps {
    image: string;
    title: string;
    description: string;
    height: string;
    author: string;
    tags?: Tag[];
    category: string;
    createdAt: string;
    page?: string;
}

const CardCustom: React.FC<CardCustomProps> = ({ image, title, description, height, author, tags, category, createdAt, page }) => {
    return (
        <Card className="custom-card"
            style={{ height: "100%" }}
        >
            <>
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
                        <TextComponent fontWeight="bold" ml={1}>{author || "Unknown"}</TextComponent>
                    </div>
                    <div style={{ display: "flex", margin: "10px 0" }}>
                        <TextComponent>Published at: </TextComponent>
                        <TextComponent fontWeight="bold" ml={1}> {formatDate(createdAt) || "Unknown"}</TextComponent>
                    </div>
                    <TextComponent gutterBottom variant="h4" component="div">
                        {title}
                    </TextComponent>
                    <Typography variant="body2" color="text.secondary" component="div"
                        dangerouslySetInnerHTML={{ __html: page == "detail" ? description : truncatedDescription(description) }}>
                    </Typography>
                </CardContent>
            </>
        </Card>
    );
}

export default CardCustom;
