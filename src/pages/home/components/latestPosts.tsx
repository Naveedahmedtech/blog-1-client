import CardCustom from '../../../components/card/CardCustom';
import "../styles/grid.css"
import TextComponent from '../../../components/text/TextComponent';
import { Box, Typography } from '@mui/material';
import LinkComponent from '../../../components/text/LinkComponent';
import { Link } from 'react-router-dom';

const LatestPosts = ({ posts }: any) => {
  if (posts?.length === 0) {
    return (
      <Box textAlign="center" my={4}>
        <Typography variant="h6">No posts found.</Typography>
      </Box>
    );
  }
  return (
    <Box sx={{ my: 4 }}>
      <TextComponent gutterBottom variant="h4">Latest Posts</TextComponent>
      {
        posts?.map((post: any) => (
          <Box className='flex-container' key={post?.id} my={5}>
            <LinkComponent className='flex-grow' to={`/posts/${post?._id}`}>
              <CardCustom
                key={post?._id}
                image={post?.image}
                title={post?.title}
                description={post?.description}
                height='350'
                author={post?.authorId?.username}
                tags={post?.tags}
                category={post?.categoryId?.name}
                createdAt={post?.createdAt}
              />
            </LinkComponent>
          </Box>
        ))
      }
      <Link to="/all-blogs">See All</Link>
    </Box>
  );
};



export default LatestPosts;
