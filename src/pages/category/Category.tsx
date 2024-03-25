import { useState, useEffect } from 'react';
import { Box, Pagination } from '@mui/material';
import { useParams, useSearchParams } from 'react-router-dom';
import TextComponent from '../../components/text/TextComponent';
import LinkComponent from '../../components/text/LinkComponent';
import CardCustom from '../../components/card/CardCustom';
import { useGetAllPostsQuery } from '../../redux/features/postsApi';
import LoadingIndicator from '../../components/loading/LoadingIndicator';

const Category = () => {
  const { category_id } = useParams();
  const [searchParams] = useSearchParams();
  const categoryName = searchParams.get('category_name');

  // Initialize page from URL search params or default to 1
  const [page, setPage] = useState(parseInt(searchParams.get('page') || '1', 10));
  const limit = 10;

  // Fetch posts
  const { data: posts, isLoading } = useGetAllPostsQuery({
    page,
    limit,
    sort: "createdAt",
    sortOrder: "desc",
    categoryId: category_id
  }) as any;

  useEffect(() => {
    // Update the URL search params when page changes
    const newSearchParams = new URLSearchParams(searchParams.toString());
    newSearchParams.set('page', page.toString());
    window.history.replaceState(null, '', `${window.location.pathname}?${newSearchParams.toString()}`);
  }, [page, searchParams]);

  if (isLoading) {
    return <LoadingIndicator />;
  }

  const handlePageChange = (value: any) => {
    setPage(value);
  };

  return (
    <Box sx={{ my: 4 }}>
      <TextComponent gutterBottom variant="h4">Showing Posts "{categoryName}"</TextComponent>
      {
        posts?.data?.results?.length === 0 &&
        <TextComponent gutterBottom variant="body1" color="red" textAlign="center">No result found "{categoryName}"</TextComponent>
      }
      {
        posts?.data?.results?.map((post: any) => (
          <Box className='flex-container' key={post?._id} my={5}>
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
              />
            </LinkComponent>
          </Box>
        ))
      }
      <Box sx={{ display: 'flex', justifyContent: 'center', mt: 3 }}>
        <Pagination
          count={posts?.data?.totalPages || 0}
          page={page}
          onChange={handlePageChange}
          variant="outlined"
          shape="rounded" />
      </Box>
    </Box>
  );
};

export default Category;
