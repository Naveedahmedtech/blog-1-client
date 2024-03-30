import { Box, CircularProgress, Pagination, Typography } from '@mui/material';
import { useState } from 'react'
import TextComponent from '../../components/text/TextComponent';
import LinkComponent from '../../components/text/LinkComponent';
import CardCustom from '../../components/card/CardCustom';
import { useGetAllPostsQuery } from '../../redux/features/postsApi';

const AllBlogs = () => {
    const [page, setPage] = useState(1);
    const limit = 10;
    const { data: posts, isLoading, isError } = useGetAllPostsQuery({ page, limit }) as any;

    const handlePageChange = (_event: any, value:any) => {
        setPage(value);
    };

    if (isLoading) {
        return (
            <Box display="flex" justifyContent="center" alignItems="center" minHeight="80vh">
                <CircularProgress />
            </Box>
        );
    }

    if (isError) {
        return (
            <Box textAlign="center" minHeight="80vh">
                <Typography variant="h5" color="error">Error fetching posts. Please try again later.</Typography>
            </Box>
        );
    }

    if (posts?.data?.results === 0) {
        return (
            <Box textAlign="center" my={4}>
                <Typography variant="h6">No posts found.</Typography>
            </Box>
        );
    }
    return (
        <Box sx={{ my: 4 }}>
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <TextComponent gutterBottom variant="h4">All Posts</TextComponent>
            </Box>
            {posts?.data?.results?.map((post:any) => (
                <Box className='flex-container' key={post.id} my={5}>
                    <LinkComponent className='flex-grow' to={`/posts/${post._id}`}>
                        <CardCustom
                            image={post?.image}
                            title={post?.title}
                            description={post?.description}
                            height="350"
                            author={post?.authorId?.username}
                            tags={post?.tags}
                            category={post?.categoryId?.name}
                            createdAt={post?.createdAt}
                        />
                    </LinkComponent>
                </Box>
            ))}
            <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
                <Pagination
                    count={posts?.data?.totalRecords || 0}
                    page={page}
                    onChange={handlePageChange}
                    variant="outlined"
                    shape="rounded" />
            </Box>
        </Box>
    )
}

export default AllBlogs
