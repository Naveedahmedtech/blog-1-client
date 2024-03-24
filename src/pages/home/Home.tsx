import { useState } from 'react';
import TrendingPosts from './components/TrendingPosts';
import LatestPosts from './components/LatestPosts';
import { useGetAllPostsQuery, useGetAllTrendingPostsQuery } from '../../redux/features/postsApi';
import { CircularProgress, Box, Typography } from '@mui/material';

const Home = () => {
  const limit = 5;
  const { data: posts, isLoading, isError, error } = useGetAllPostsQuery({ page: 1, limit });
  const { data: trendingPosts, isLoading: isLoadingTrendingPost, isError: isTrendingPostError, error: errorTrendingPost } = useGetAllTrendingPostsQuery({ page: 1, limit });

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
