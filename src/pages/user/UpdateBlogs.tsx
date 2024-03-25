import { useState, useEffect, ChangeEvent, FormEvent } from 'react';
import {
    Card,
    TextField,
    Button,
    Select,
    MenuItem,
    InputLabel,
    FormControl,
    OutlinedInput,
    Chip,
    CircularProgress,
    Snackbar,
    Typography,
} from '@mui/material';
import { useGetAllCategoriesQuery, useGetAllTagsQuery, useGetPostByIdQuery, useUpdatePostMutation } from '../../redux/features/postsApi';
import { useAuth } from '../../hooks/useAuth';
import { decodeToken } from '../../utils/tokens';
import { useNavigate, useParams } from 'react-router-dom';
import { BASE_URL } from '../../../baseUrl';

interface FormData {
    title: string;
    description: string;
    category: string;
    tagIds: string[];
    image: File | null;
    imagePreviewUrl: string | null;
}

const initialFormData = {
    title: '',
    description: '',
    category: '',
    tagIds: [],
    image: null,
    imagePreviewUrl: null,
};

const UpdateBlogs = () => {
    const params = useParams<{ id: string }>();
    const { id } = params as any;
    const navigate = useNavigate()
    const [updatePost, { isLoading: addLoading }] = useUpdatePostMutation();

    const { data: postData, isLoading: postLoading } = useGetPostByIdQuery({ post_id: id });
    const { data: categories, isLoading: categoryLoading } = useGetAllCategoriesQuery();
    const { data: tags, isLoading: tagsLoading } = useGetAllTagsQuery();
    const [formData, setFormData] = useState<FormData>(initialFormData);
    useEffect(() => {
        if (postData) {
            setFormData({
                title: postData?.data?.title,
                description: postData?.data?.description,
                category: postData?.data?.categoryId?._id,
                tagIds: postData?.data?.tags?.map((tag: any) => tag._id),
                image: postData?.data?.image,
                imagePreviewUrl: BASE_URL + '/uploads/' + postData?.data?.image,
            })
        }
    }, [postData]);

    const [openSnackbar, setOpenSnackbar] = useState(false);

    const { userData } = useAuth();
    const user = decodeToken(userData) as any;
    const userId = user?.sub;

    const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement> | { target: { name: string; value: unknown; }; }) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files ? e.target.files[0] : null;
        setFormData((prev) => ({
            ...prev,
            image: file,
            imagePreviewUrl: file ? URL.createObjectURL(file) : null,
        }));
    };

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        const createdFormData = new FormData();
        createdFormData.append('id', id);
        createdFormData.append('title', formData.title);
        createdFormData.append('description', formData.description);
        createdFormData.append('categoryId', formData.category);
        if (formData.image) createdFormData.append('image', formData.image);
        createdFormData.append('authorId', userId || '');

        if (formData.tagIds && Array.isArray(formData.tagIds)) {
            createdFormData.append('tagIds', JSON.stringify(formData.tagIds));
        } else {
            console.error('tagIds must be an array');
            return;
        }

        try {
            await updatePost(createdFormData).unwrap();
            setOpenSnackbar(true);
            setFormData(initialFormData);
            navigate('/my-blogs')
        } catch (error) {
            console.error("Add Post Error", error);
        }
    };

    const handleTagsChange = (event: any) => {
        const value = event.target.value;
        setFormData((prev) => ({
            ...prev,
            tagIds: value as string[],
        }));
    };

    if (postLoading || categoryLoading || tagsLoading) {
        return <CircularProgress />;
    }

    if (!formData) {
        return <div>Error: Failed to fetch post data.</div>;
    }

    return (
        <Card sx={{ p: 2 }}>
            <Typography variant='h4'>Update Blog</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                />
                <TextField
                    label="Description"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="description"
                    multiline
                    rows={4}
                    value={formData.description}
                    onChange={handleChange}
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={formData.category}
                        onChange={handleChange}
                        name="category"
                        label="Category"
                    >
                        {categories?.data.map((category: any) => (
                            <MenuItem key={category?._id} value={category?._id}>
                                {category?.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                <FormControl fullWidth margin="normal">
                    <InputLabel>Tags</InputLabel>
                    <Select
                        multiple
                        value={formData.tagIds}
                        onChange={handleTagsChange}
                        input={<OutlinedInput label="Tags" />}
                        renderValue={(selected) => (
                            <div style={{ display: 'flex', flexWrap: 'wrap', gap: 0.5 }}>
                                {selected.map((selectedTagId: any) => {
                                    const tagObj = tags?.data.find((tag: any) => tag._id === selectedTagId);
                                    return (
                                        <Chip
                                            key={selectedTagId}
                                            label={tagObj ? tagObj.name : ''}
                                            sx={{ m: 0.5, color: 'white', backgroundColor: 'primary.main' }}
                                        />
                                    );
                                })}
                            </div>
                        )}
                    >
                        {tags?.data.map((tag: any) => (
                            <MenuItem key={tag._id} value={tag._id}>
                                {tag.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                <Button
                    variant="contained"
                    component="label"
                    fullWidth
                    sx={{ mt: 2, mb: 2 }}
                >
                    Upload Image
                    <input
                        type="file"
                        hidden
                        onChange={handleImageChange}
                    />
                </Button>
                {formData.imagePreviewUrl && (
                    <div style={{ textAlign: 'center', marginBottom: '16px' }}>
                        <img
                            src={formData.imagePreviewUrl}
                            alt="Selected"
                            style={{ maxWidth: '100%', maxHeight: '300px', height: 'auto' }}
                        />
                    </div>
                )}

                <Button type="submit" variant="contained" color="primary" fullWidth disabled={addLoading}>
                    {addLoading ? 'Submitting...' : 'Submit'}
                </Button>
            </form>

            <Snackbar
                open={openSnackbar}
                autoHideDuration={6000}
                onClose={() => setOpenSnackbar(false)}
                message="Post added successfully"
            />
        </Card>
    );
};

export default UpdateBlogs;
