import TrendingPosts from './components/TrendingPosts';
import { useGetAllPostsQuery, useGetAllTrendingPostsQuery } from '../../redux/features/postsApi';
import { CircularProgress, Box, Typography } from '@mui/material';
import LatestPosts from './components/latestPosts';

const Home = () => {
  const limit = 5;
  const { data: posts, isLoading, isError } = useGetAllPostsQuery({ page: 1, limit }) as any;
  const { data: trendingPosts, isLoading: isLoadingTrending } = useGetAllTrendingPostsQuery({ page: 1, limit }) as any;

  if (isLoading || isLoadingTrending) {
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

  return (
    <>
      <TrendingPosts posts={trendingPosts?.data?.results} />
      <LatestPosts
        posts={posts?.data?.results}
      />
    </>
  );
};

export default Home;
