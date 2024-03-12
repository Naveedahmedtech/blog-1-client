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
    { id: 1, image: blog1, title: "some-title", description: hd, author: "some-author", tags: ["#trending"], category: "some-category"},
    { id: 2, image: blog2, title: "some-title", description: "some description", author: "some-author", tags: ["#trending"], category: "some-category" },
    { id: 3, image: blog3, title: "some-title", description: "some description", author: "some-author", tags: ["#trending"], category: "some-category" },
];

const TrendingPosts = () => {
    return (
        <Box sx={{ my: 2 }}>
            <TextComponent gutterBottom variant="h4">Trending Posts</TextComponent>
            <div className='flex-container'>
                <LinkComponent className='flex-grow' to={`/posts/${dummyApiResponse[0].id}`}>
                    <CardCustom
                        key={dummyApiResponse[0].id}
                        image={dummyApiResponse[0].image}
                        title={dummyApiResponse[0].title}
                        description={dummyApiResponse[0].description}
                        height='350'
                        author={dummyApiResponse[0].author}
                        // tags={dummyApiResponse[0].tags}
                        category={dummyApiResponse[0].category}
                    />
                </LinkComponent>
                <div className='flex-container-col'>
                    <LinkComponent className='flex-grow' to={`/posts/${dummyApiResponse[1].id}`}>
                        <CardCustom
                            key={dummyApiResponse[1].id}
                            image={dummyApiResponse[1].image}
                            title={dummyApiResponse[1].title}
                            description={dummyApiResponse[1].description}
                            height='140'
                            author={dummyApiResponse[1].author}
                            // tags={dummyApiResponse[1].tags}
                            category={dummyApiResponse[1].category}

                        />
                    </LinkComponent>
                    <LinkComponent className='flex-grow' to={`/posts/${dummyApiResponse[2].id}`}>
                        <CardCustom
                            key={dummyApiResponse[2].id}
                            image={dummyApiResponse[2].image}
                            title={dummyApiResponse[2].title}
                            description={dummyApiResponse[2].description}
                            height='140'
                            author={dummyApiResponse[2].author}
                            // tags={dummyApiResponse[2].tags}
                            category={dummyApiResponse[2].category}

                        />
                    </LinkComponent>
                </div>
            </div>
        </Box>
    );
};



export default TrendingPosts;
