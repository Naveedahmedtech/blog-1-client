import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Box } from '@mui/material';
import ConfirmationModal from '../../components/modals/ConfirmationModal';
import MyTable from '../../components/table/Table'; 
import { useGetAllPostsByAuthorQuery } from '../../redux/features/postsApi';
import { useAuth } from '../../hooks/useAuth';
import { decodeToken } from '../../utils/tokens';
import ActionButtons from '../../components/buttons/ActionButtons';
import LoadingIndicator from '../../components/loading/LoadingIndicator';
import EmptyPostsMessage from '../../components/error/EmptyPostsMessage';

const MyBlogs = () => {
    const { userData } = useAuth();
    const navigate = useNavigate();
    const user = decodeToken(userData) as any;
    const userId = user?.sub;

    const [page, setPage] = useState(1);
    const [rowsPerPage, setRowsPerPage] = useState(10);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentPostId, setCurrentPostId] = useState(null);

    const { data: posts, isLoading, isError } = useGetAllPostsByAuthorQuery({
        author_id: userId,
        page,
        limit: rowsPerPage,
    });

    const handleChangePage = (newPage:any, newRowsPerPage:any) => {
        setPage(newPage);
        if (rowsPerPage !== newRowsPerPage) {
            setRowsPerPage(newRowsPerPage);
            setPage(1); // Reset to first page if rows per page changes
        }
    };
    const handleOpenModal = (postId:any) => {
        setCurrentPostId(postId);
        setIsModalOpen(true);
    };

    const handleConfirmDelete = async () => {
        setIsModalOpen(false);
    };

    const handleCancelDelete = () => {
        setIsModalOpen(false);
        setCurrentPostId(null);
    };

    const columns = [
        { id: 'title', label: 'Title', align: 'left' },
        { id: 'category', label: 'Category', align: 'right', render: (row:any) => row.categoryId?.name },
        { id: 'tags', label: 'Tags', align: 'right', render: (row:any) => row.tags?.map((tag:any) => tag.name).join(', ') },
    ];

    const renderRowActions = (row:any) => (
        <>
            <ActionButtons
                row={row}
                navigate={navigate}
                handleOpenModal={handleOpenModal}
            />
        </>
    );

    if (isLoading) return <LoadingIndicator />;
    if (isError || !posts?.data?.length) return <EmptyPostsMessage message="No blogs found" />;

    return (
        <Box>
            <MyTable
                columns={columns}
                data={posts.data}
                totalCount={posts.total}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={handleChangePage}
                renderRowActions={renderRowActions}
                rowsPerPageOptions={[10, 20, 50]}
            />
            <ConfirmationModal
                open={isModalOpen}
                title="Confirm Delete"
                message="Are you sure you want to delete this post?"
                onConfirm={() => {
                    setIsModalOpen(false);
                }}
                onCancel={() => setIsModalOpen(false)}
            />
        </Box>
    );
};

export default MyBlogs;
