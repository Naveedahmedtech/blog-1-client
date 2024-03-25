import React, { useState, ChangeEvent, FormEvent } from 'react';
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
    SelectChangeEvent,
    Typography,
} from '@mui/material';
import { useAddPostMutation, useGetAllCategoriesQuery, useGetAllTagsQuery } from '../../redux/features/postsApi';
import { useAuth } from '../../hooks/useAuth';
import { decodeToken } from '../../utils/tokens';
import { useNavigate } from 'react-router-dom';

interface FormData {
    title: string;
    description: string;
    category: string;
    tagIds: string[];
    image: File | null;
    imagePreviewUrl: string | null;
    errors: {
        title: string | null;
        description: string | null;
        category: string | null;
        tags: string | null;
        image: string | null;
    };
}


const initialFormData: FormData = {
    title: '',
    description: '',
    category: '',
    tagIds: [],
    image: null,
    imagePreviewUrl: null,
    errors: {
        title: null,
        description: null,
        category: null,
        tags: null,
        image: null,
    },
};

const AddBlog: React.FC = () => {
    const [formData, setFormData] = useState<FormData>(initialFormData);
    const [openSnackbar, setOpenSnackbar] = useState(false);

    const navigate = useNavigate()

    const { data: categories, isLoading: categoryLoading } = useGetAllCategoriesQuery();
    const { data: tags, isLoading: tagsLoading } = useGetAllTagsQuery();
    const [addPost, { isLoading: postLoading }] = useAddPostMutation();


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

        // Validate if all required fields are filled
        const errors = {
            title: !formData.title ? 'Title is required' : null,
            description: !formData.description ? 'Description is required' : null,
            category: !formData.category ? 'Category is required' : null,
            tags: formData.tagIds.length === 0 ? 'At least one tag is required' : null,
            image: !formData.image ? 'Image is required' : null,
        };

        setFormData((prev) => ({ ...prev, errors }));

        // If there are any errors, prevent form submission
        if (Object.values(errors).some((error) => error !== null)) {
            return;
        }

        const createdFormData = new FormData();
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
            const response = await addPost(createdFormData).unwrap();
            console.log("Add Post API response: ", response);
            setOpenSnackbar(true);
            setFormData(initialFormData);
            navigate('/my-blogs')
        } catch (error) {
            console.error("Add Post Error", error);
        }
    };

    const handleTagsChange = (
        event: SelectChangeEvent<string[]>, // Simplified type for clarity
    ) => {
        const value = event.target.value;
        setFormData(prev => ({
            ...prev,
            tagIds: typeof value === 'string' ? [value] : value as string[], // Cast to string array
        }));
    };


    return (
        <Card sx={{ p: 2 }}>
            <Typography variant='h4'>Add Blog</Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    label="Title"
                    variant="outlined"
                    fullWidth
                    margin="normal"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    error={!!formData.errors.title}
                    helperText={formData.errors.title}
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
                    error={!!formData.errors.description}
                    helperText={formData.errors.description}
                />
                {categoryLoading ? (
                    <CircularProgress />
                ) : (
                    <FormControl fullWidth margin="normal">
                        <InputLabel>Category</InputLabel>
                        <Select
                            value={formData.category}
                            onChange={handleChange}
                            name="category"
                            label="Category"
                            error={!!formData.errors.category}
                        >
                            {categories?.data.map((category: any) => (
                                <MenuItem key={category?._id} value={category?._id}>
                                    {category?.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {formData.errors.category && (
                            <Typography variant="caption" color="error">
                                {formData.errors.category}
                            </Typography>
                        )}
                    </FormControl>
                )}
                {tagsLoading ? (
                    <CircularProgress />
                ) : (
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
                                                label={tagObj ? tagObj
                                                    .name : ''}
                                                sx={{ m: 0.5, color: 'white', backgroundColor: 'primary.main' }}
                                            />
                                        );
                                    })}
                                </div>
                            )}
                            error={!!formData.errors.tags}
                        >
                            {tags?.data.map((tag: any) => (
                                <MenuItem key={tag._id} value={tag._id}>
                                    {tag.name}
                                </MenuItem>
                            ))}
                        </Select>
                        {formData.errors.tags && (
                            <Typography variant="caption" color="error">
                                {formData.errors.tags}
                            </Typography>
                        )}
                    </FormControl>
                )}

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
                {formData.errors.image && (
                    <Typography variant="caption" color="error">
                        {formData.errors.image}
                    </Typography>
                )}

                <Button type="submit" variant="contained" color="primary" fullWidth disabled={postLoading}>
                    {postLoading ? 'Submitting...' : 'Submit'}
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

export default AddBlog;
