import CardCustom from '../../../components/card/CardCustom';
import "../styles/grid.css"
import TextComponent from '../../../components/text/TextComponent';
import { Box, Typography } from '@mui/material';
import LinkComponent from '../../../components/text/LinkComponent';


// const posts = [
//     { id: 1, image: blog1, title: "some-title", description: hd, author: "some-author", tags: ["#trending"], category: "some-category"},
//     { id: 2, image: blog2, title: "some-title", description: "some description", author: "some-author", tags: ["#trending"], category: "some-category" },
//     { id: 3, image: blog3, title: "some-title", description: "some description", author: "some-author", tags: ["#trending"], category: "some-category" },
// ];

const TrendingPosts = ({ posts }) => {
    if (posts?.length === 0) {
        return (
            <Box textAlign="center" my={4}>
                <Typography variant="h6">No posts found.</Typography>
            </Box>
        );
    }
    return (
        <Box sx={{ my: 2 }}>
            <TextComponent gutterBottom variant="h4">Trending Posts</TextComponent>
            <div className='flex-container'>
                <LinkComponent className='flex-grow' to={`/posts/${posts?.[0]._id}`}>
                    <CardCustom
                        key={posts?.[0]?._id}
                        image={posts?.[0]?.image}
                        title={posts?.[0]?.title}
                        description={posts?.[0]?.description}
                        height='350'
                        author={posts?.[0]?.authorId?.username}
                        tags={posts?.[0]?.tags}
                        category={posts?.[0]?.categoryId?.name}
                    />
                </LinkComponent>
                <div className='flex-container-col'>
                    <LinkComponent className='flex-grow' to={`/posts/${posts?.[1]._id}`}>
                        <CardCustom
                            key={posts?.[1]?._id}
                            image={posts?.[1]?.image}
                            title={posts?.[1]?.title}
                            description={posts?.[1]?.description}
                            height='140'
                            author={posts?.[1]?.authorId?.username}
                            tags={posts?.[1]?.tags}
                            category={posts?.[1]?.categoryId?.name}

                        />
                    </LinkComponent>
                    <LinkComponent className='flex-grow' to={`/posts/${posts?.[2]?._id}`}>
                        <CardCustom
                            key={posts?.[2]?._id}
                            image={posts?.[2]?.image}
                            title={posts?.[2]?.title}
                            description={posts?.[2]?.description}
                            height='140'
                            author={posts?.[2]?.authorId?.username}
                            tags={posts?.[2]?.tags}
                            category={posts?.[2]?.categoryId?.name}
                        />
                    </LinkComponent>
                </div>
            </div>
        </Box>
    );
};



export default TrendingPosts;
