import React, { useState, useEffect } from "react";
import {
    TextField,
    Select,
    MenuItem,
    Button,
    Typography,
    FormControl,
    InputLabel,
    Box
} from "@mui/material";
import MDEditor from "@uiw/react-md-editor";
import { uploadImageApi, getImageUrl } from "../../api/images";

import { Image as ImageIcon } from "@mui/icons-material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';


const NoteForm = ({ onAddNote, onCancel, noteToEdit, categories }) => {
    const [title, setTitle] = useState(noteToEdit?.title || '');
    const [category, setCategory] = useState(noteToEdit?.category || "");
    const [description, setDescription] = useState(noteToEdit?.description || "");

    const [coverImage, setCoverImage] = useState(null); // main cover image

    const handleInsertImage = async (e) => {
        const file = e.target.files[0];
        if (!file) return;

        try {
            const fileName = await uploadImageApi(file);

            const newText =
                `${description}\n\n![image](${fileName})\n`;

            setDescription(newText);
        } catch (err) {
            console.error("Image upload failed", err);
            alert("Failed to upload image into text");
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!title || !category) {
            alert("Please fill out both title and description");
            return;
        }

        try {
            let coverFileName = noteToEdit?.image_file || null;

            if (coverImage) {
                console.log("📤 Uploading cover image:", coverImage);
                coverFileName = await uploadImageApi(coverImage);
                console.log("📥 Uploaded coverImage fileName =", coverFileName);
            };

            const updatedNote = {
                id: noteToEdit ? noteToEdit.id : new Date().getTime(),
                title,
                category,
                description,
                image_file: coverFileName,
                date: new Date().toLocaleDateString(),
                completed: noteToEdit?.completed || false
            };

            onAddNote(updatedNote); // Send note to Redux

            setTitle("");
            setCategory("");
            setDescription("");
            console.log('added')
        } catch (err) {
            console.error("❌ Error while saving note:", err);
            alert("Failed to save note");
        }
    };

    return (
        <Box sx={{
            margin: "0 auto",
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            borderRadius: 3,
            width: '70%'
        }}>
            <Typography variant="h5" gutterBottom>
                {noteToEdit ? "Edit Note" : "Add Note"}
            </Typography>
            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    margin="normal"
                />
                <FormControl fullWidth margin="normal">
                    <InputLabel>Category</InputLabel>
                    <Select
                        value={category}
                        onChange={(e) => {
                            setCategory(parseInt(e.target.value));
                            console.log(e.target.value)
                        }}
                        label="Category"
                    >
                        <MenuItem value="" disabled>
                            Select category
                        </MenuItem>
                        {categories.map((cat) => (
                            <MenuItem key={cat.id} value={cat.id}>
                                {cat.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
                {/* Markdown Editor */}
                <Box data-color-mode="light" sx={{ position: "relative" }}>
                    {!description && (
                        <Typography
                            sx={{
                                position: "absolute",
                                top: 35,
                                left: 12,
                                color: "gray",
                                pointerEvents: "none",
                                zIndex: 2
                            }}
                        >
                            Start typing your note here...
                        </Typography>
                    )}

                    <MDEditor value={description} onChange={setDescription} height={250} previewOptions={{
                        components: {
                            img: (props) => {
                                const [url, setUrl] = useState(null);

                                useEffect(() => {
                                    async function load() {
                                        const signed = await getImageUrl(props.src);
                                        setUrl(signed);
                                    }
                                    load();
                                }, [props.src]);

                                return (
                                    <img
                                        {...props}
                                        src={url}
                                        style={{
                                            maxWidth: "100%",
                                            maxHeight: "200px",
                                            objectFit: "contain",
                                            borderRadius: 8,
                                            margin: "10px 0"
                                        }}
                                    />
                                );
                            }
                        }
                    }} />
                </Box>

                {/* PHOTO UPLOADS */}
                <Box sx={{ mb: 3, mt: 3 }}>
                    <Button
                        variant="outlined"
                        component="label"
                        startIcon={<AddPhotoAlternateIcon />}
                    >
                        Upload Image for Text
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={handleInsertImage}
                        />
                    </Button>

                    <Typography variant="caption" sx={{ display: "block", mt: 1, color: "gray" }}>
                        The image will be inserted into the Markdown editor.
                    </Typography>
                </Box>


                {/* Note cover */}
                <Box sx={{ mb: 3 }}>
                    <Button
                        variant="outlined"
                        component="label"
                        startIcon={<ImageIcon />}
                    >
                        Upload Cover Image
                        <input
                            type="file"
                            hidden
                            accept="image/*"
                            onChange={(e) => setCoverImage(e.target.files[0])}
                        />
                    </Button>

                    {coverImage && (
                        <Typography
                            variant="body2"
                            sx={{
                                mt: 1,
                                color: "gray",
                                fontStyle: "italic"
                            }}
                        >
                            Selected file: {coverImage.name}
                        </Typography>
                    )}
                </Box>


                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                    <Button type="submit" variant="contained" color="primary">
                        {noteToEdit ? "Update Note" : "Add Note"}
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                </Box>
            </form>
        </Box>
    );
};

export default NoteForm;

