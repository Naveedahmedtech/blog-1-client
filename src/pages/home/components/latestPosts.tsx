import { Link } from 'react-router-dom';
import CardCustom from '../../../components/card/CardCustom';
import "../styles/grid.css"
import blog1 from '../../../assets/images/home/blog1.jpg'
import blog2 from '../../../assets/images/home/blog2.jpg'
import blog3 from '../../../assets/images/home/blog3.jpg'
import { Typography } from '@mui/material';
const hd = 'lorem ipsum dolor sit amet, consectetur adip e fits entirely within the boundaries of the screen and is therefore    completely transparent to the user '

const dummyApiResponse = [
  { id: 1, image: blog1, title: "some-title", description: hd },
  { id: 2, image: blog2, title: "some-title", description: "some description" },
  { id: 3, image: blog3, title: "some-title", description: "some description" },
];

const LatestPosts = () => {
  return (
    <>
      <Typography gutterBottom variant="h4">Latest Posts</Typography>
      <div className='flex-container'>
        <Link className='flex-grow' to={`/posts/${dummyApiResponse[0].id}`}>
          <CardCustom
            key={dummyApiResponse[0].id}
            image={dummyApiResponse[0].image}
            title={dummyApiResponse[0].title}
            description={dummyApiResponse[0].description}
            height='350'
          />
        </Link>
        <div className='flex-container-col'>
          <Link className='flex-grow' to={`/posts/${dummyApiResponse[1].id}`}>
            <CardCustom
              key={dummyApiResponse[1].id}
              image={dummyApiResponse[1].image}
              title={dummyApiResponse[1].title}
              description={dummyApiResponse[1].description}
              height='140'
            />
          </Link>
          <Link className='flex-grow' to={`/posts/${dummyApiResponse[2].id}`}>
            <CardCustom
              key={dummyApiResponse[2].id}
              image={dummyApiResponse[2].image}
              title={dummyApiResponse[2].title}
              description={dummyApiResponse[2].description}
              height='140'
            />
          </Link>
        </div>
      </div>
    </>
  );
};



export default LatestPosts;
