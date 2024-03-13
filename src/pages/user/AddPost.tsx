import React, { useState, useEffect } from 'react';
import { TextField, Button, Select, MenuItem, InputLabel, FormControl, OutlinedInput, Chip } from '@mui/material';

const AddPost = () => {
    const [categories, setCategories] = useState([]);
    const [tags, setTags] = useState([]);
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        category: '',
        tags: [],
        image: null,
    });

    // Fetch categories and tags from your API
    useEffect(() => {
        // Placeholder functions to fetch categories and tags
        const fetchCategories = async () => {
            // Your API call here
            setCategories(['Category 1', 'Category 2']); // Example categories
        };

        const fetchTags = async () => {
            // Your API call here
            setTags(['Tag 1', 'Tag 2', 'Tag 3']); // Example tags
        };

        fetchCategories();
        fetchTags();
    }, []);

    // Handle change for most inputs
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
    };

    // Handle change for tags (multi-select)
    const handleTagsChange = (event) => {
        const {
            target: { value },
        } = event;
        setFormData((prev) => ({ ...prev, tags: typeof value === 'string' ? value.split(',') : value, }));
    };

    // Handle form submission
    const handleSubmit = (e) => {
        e.preventDefault();
        // Process your formData here
        console.log(formData);
    };

    return (
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
                    {categories.map((category) => (
                        <MenuItem key={category} value={category}>
                            {category}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <FormControl fullWidth margin="normal">
                <InputLabel>Tags</InputLabel>
                <Select
                    multiple
                    value={formData.tags}
                    onChange={handleTagsChange}
                    input={<OutlinedInput label="Tags" />}
                    renderValue={(selected) => (
                        <div>
                            {selected.map((value) => (
                                <Chip key={value} label={value} />
                            ))}
                        </div>
                    )}
                >
                    {tags.map((tag) => (
                        <MenuItem key={tag} value={tag}>
                            {tag}
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>
            <Button
                variant="contained"
                component="label"
                fullWidth
                margin="normal"
            >
                Upload Image
                <input
                    type="file"
                    hidden
                    onChange={(e) => setFormData((prev) => ({ ...prev, image: e.target.files[0] }))}
                />
            </Button>
            <Button type="submit" variant="contained" color="primary" fullWidth>
                Submit
            </Button>
        </form>
    );
};

export default AddPost;
