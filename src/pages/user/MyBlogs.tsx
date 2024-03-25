import { useEffect, useState } from 'react';
import { Box, Snackbar, FormControl, InputLabel, Select, MenuItem, Typography } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import MyTable from '../../components/table/Table';
import { useDeletePostMutation, useGetAllCategoriesQuery, useGetAllPostsByAuthorQuery } from '../../redux/features/postsApi';
import { useAuth } from '../../hooks/useAuth';
import { decodeToken } from '../../utils/tokens';
import ActionButtons from '../../components/buttons/ActionButtons';
import LoadingIndicator from '../../components/loading/LoadingIndicator';
import EmptyPostsMessage from '../../components/error/EmptyPostsMessage';
import { Sort } from '@mui/icons-material';

const MyBlogs = () => {
    const { userData } = useAuth();
    const navigate = useNavigate();
    const user = decodeToken(userData) as any;
    const userId = user?.sub;

    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPostId, setCurrentPostId] = useState(null);
    const [sortBy, setSortBy] = useState('createdAt');
    const [sortOrder, setSortOrder] = useState(-1); // -1 for descending, 1 for ascending
    const [categoryId, setCategoryId] = useState('');
    const [errorSnackbarOpen, setErrorSnackbarOpen] = useState(false);
    const [errorSnackbarMessage, setErrorSnackbarMessage] = useState('');
    const { data: posts, isLoading, isError, refetch } = useGetAllPostsByAuthorQuery({
        author_id: userId,
        page,
        limit: rowsPerPage,
        sortBy,
        sortOrder,
        categoryId,
    }, {
        refetchOnMountOrArgChange: true,
    });
    const { data: categories, isLoading: categoryLoading } = useGetAllCategoriesQuery();
    const [deletePost, { isLoading: deleteLoading }] = useDeletePostMutation()
    useEffect(() => {
        refetch();
    }, [refetch]);

    const handleChangePage = (event:any, newPage:any) => {
        setPage(newPage + 1); // Adding 1 because Material-UI pagination starts from 0
    };

    const handleChangeRowsPerPage = (event:any) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(1); // Reset page to 1 when changing rows per page
    };

    const handleSortChange = (event:any) => {
        const { value } = event.target;
        setPage(1); // Reset page to 1 when changing sorting criteria
        setSortBy(value);
    };

    const handleSortOrderChange = (event:any) => {
        const { value } = event.target;
        setSortOrder(parseInt(value, 10));
    };

    const handleFilterChange = (e:any) => {
        setPage(1);
        const selectedCategoryId = e.target.value;
        setCategoryId(selectedCategoryId); // Directly update categoryId state
    };

    const handleErrorSnackbarClose = (event:any, reason:any) => {
        if (reason === 'clickaway') {
            return;
        }
        setErrorSnackbarOpen(false);
    };

    const handleOpenModal = (postId: any) => {
        setCurrentPostId(postId);
        setIsModalOpen(true);
    };


    const handleDeletePost = async () => {
        try {
            await deletePost(currentPostId);
            setIsModalOpen(false)
            refetch()
        } catch (error) {
            console.log(error);
        }
    }

    const columns = [
        { id: 'title', label: 'Title', align: 'left', sortable: true },
        {
            id: 'category', label: 'Category', align: 'right', sortable: true, render: (row: any) => row.categoryId?.name
        },
        { id: 'tags', label: 'Tags', align: 'right', sortable: false, render: (row: any) => row.tags?.map((tag: any) => tag.name).join(', ') },
    ];

    const renderRowActions = (row: any) => (
        <ActionButtons
            row={row}
            navigate={navigate}
            handleOpenModal={handleOpenModal}
        />
    );

    if (isLoading) return <LoadingIndicator />;
    if (isError) {
        setErrorSnackbarMessage('Failed to load posts. Please try again later.');
        setErrorSnackbarOpen(true);
    }

    return (
        <Box p={3}>
            <Typography variant="h4" gutterBottom>
                My Blogs
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 2 }}>
                <div>
                    <FormControl sx={{ minWidth: 180, marginRight: 2 }}>
                        <InputLabel id="sort-by-label">Sort By</InputLabel>
                        <Select
                            labelId="sort-by-label"
                            id="sort-by-select"
                            value={sortBy}
                            label="Sort By"
                            onChange={handleSortChange}
                            startAdornment={<Sort />}
                        >
                            {columns.map((column) => (
                                <MenuItem key={column.id} value={column.id}>
                                    {column.label}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                    <FormControl sx={{ minWidth: 180 }}>
                        <InputLabel id="sort-order-label">Order</InputLabel>
                        <Select
                            labelId="sort-order-label"
                            id="sort-order-select"
                            value={sortOrder}
                            label="Order"
                            onChange={handleSortOrderChange}
                        >
                            <MenuItem value={-1}>Descending</MenuItem>
                            <MenuItem value={1}>Ascending</MenuItem>
                        </Select>
                    </FormControl>
                </div>
                {!categoryLoading && categories && (
                    <FormControl sx={{ minWidth: 180 }}>
                        <InputLabel id="category-label">Category</InputLabel>
                        <Select
                            labelId="category-label"
                            id="category-select"
                            value={categoryId}
                            onChange={handleFilterChange}
                        >
                            <MenuItem value="">All Categories</MenuItem>
                            {categories.data.map((category: any) => (
                                <MenuItem key={category._id} value={category._id}>
                                    {category.name}
                                </MenuItem>
                            ))}
                        </Select>
                    </FormControl>
                )}
            </Box>
            {posts?.data?.results?.length ? (
                <MyTable
                    columns={columns}
                    data={posts.data?.results}
                    totalCount={posts.data?.totalRecords}
                    renderRowActions={renderRowActions}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    sortBy={sortBy}
                    sortOrder={sortOrder}
                />
            ) : (
                <EmptyPostsMessage message="No blogs found for the selected category." />
            )}
            <ConfirmationModal
                open={isModalOpen}
                title="Confirm Delete"
                message="Are you sure you want to delete this post?"
                onConfirm={handleDeletePost}
                onCancel={() => setIsModalOpen(false)}
            />
            <Snackbar
                open={errorSnackbarOpen}
                autoHideDuration={6000}
                onClose={handleErrorSnackbarClose}
                message={errorSnackbarMessage}
            />
        </Box>
    );
};

export default MyBlogs;
