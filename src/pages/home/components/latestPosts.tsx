import CardCustom from '../../../components/card/CardCustom';
import "../styles/grid.css"
import TextComponent from '../../../components/text/TextComponent';
import { Box } from '@mui/material';
import LinkComponent from '../../../components/text/LinkComponent';

const LatestPosts = ({ posts }: any) => {
  return (
    <Box sx={{ my: 4 }}>
      <TextComponent gutterBottom variant="h4">Latest Posts</TextComponent>
      {
        posts?.data?.map((post:any) => (
          <Box className='flex-container' key={post?.id} my={5}>
            <LinkComponent className='flex-grow' to={`/posts/${post?.id}`}>
              <CardCustom
                key={post?.id}
                image={post?.image}
                title={post?.title}
                description={post?.description}
                height='350'
                author={post?.author?.username}
                tags={post?.tags}
                category={post?.category?.name}
              />
            </LinkComponent>
          </Box>
        ))
      }
    </Box>
  );
};



export default LatestPosts;
