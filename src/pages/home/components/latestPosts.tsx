import CardCustom from '../../../components/card/CardCustom';
import "../styles/grid.css"
import blog1 from '../../../assets/images/home/blog1.jpg'
import blog2 from '../../../assets/images/home/blog2.jpg'
import blog3 from '../../../assets/images/home/blog3.jpg'
import TextComponent from '../../../components/text/TextComponent';
import { Box } from '@mui/material';
import LinkComponent from '../../../components/text/LinkComponent';
const hd = 'lorem ipsum dolor sit amet, consectetur adip e fits entirely within the boundaries of the screen and is therefore    completely transparent to the user '

const dummyApiResponse = [
  { id: 1, image: blog1, title: "some-title", description: hd, author: "some-author", tags: [ "#latest", "#entertainment"], category: "some-category" },
  { id: 2, image: blog2, title: "some-title", description: "some description", author: "some-author", tags: ["#latest", "#entertainment"], category: "some-category" },
  { id: 3, image: blog3, title: "some-title", description: "some description", author: "some-author", tags: ["#latest", "#entertainment"], category: "some-category" },
];

const LatestPosts = () => {
  return (
    <Box sx={{ my: 4 }}>
      <TextComponent gutterBottom variant="h4">Latest Posts</TextComponent>
      {
        dummyApiResponse?.map((post) => (
          <Box className='flex-container' key={post?.id} my={5}>
            <LinkComponent className='flex-grow' to={`/posts/${post?.id}`}>
              <CardCustom
                key={post?.id}
                image={post?.image}
                title={post?.title}
                description={post?.description}
                height='350'
                author={post?.author}
                tags={post?.tags}
                category={post?.category}
              />
            </LinkComponent>
          </Box>
        ))
      }
    </Box>
  );
};



export default LatestPosts;
