import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { toggleCompleted } from '../../features/notesSlice';
import { toggleCompletedApi } from '../../api/notes';
import { Card, CardContent, Box, Typography, Checkbox, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';


import { getImageUrl } from '../../api/images'

const categoryColors = {
    Home: "var(--home-color)",
    Personal: "var(--personal-color)",
    Business: "var(--business-color)",
};

const getCategoryColor = (category) => {
    //return completed ? "var(--completed)" : categoryColors[category] || "gray";
    return categoryColors[category]
};

const NoteItem = ({ note, onDeleteNote, onEditNote, onOpenFullNote }) => {

    const [signedUrl, setSignedUrl] = useState(null);

    useEffect(() => {
        if (!note.image_file) return;

        getImageUrl(note.image_file).then(url => setSignedUrl(url));
    }, [note.image_file]);


    const dispatch = useDispatch();
    const cardColor = getCategoryColor(note.category_name);

    const handleDelete = (e) => {
        e.stopPropagation();
        onDeleteNote(note.id);
    };

    const handleEdit = (e) => {
        e.stopPropagation();
        onEditNote(note);
    };

    const handleCheckboxChange = async (e) => {
        e.stopPropagation();
        const updatedNote = await toggleCompletedApi(note.id)
        dispatch(toggleCompleted(updatedNote.id))

    };

    const card = () => (
        <Card
            variant="outlined"
            sx={{
                backgroundColor: "white",//cardColor,
                color: "var(--text-color)",
                borderRadius: 2,
                boxShadow: 3,
                padding: 2,
                width: "100%", // Ensures equal width for all cards
                minWidth: 300,  // Sets a minimum width to maintain structure
                maxWidth: 400,  // Prevents the card from being too wide
                display: "flex",
                flexDirection: "column"
            }}
            onClick={() => onOpenFullNote(note)}
        >
            <CardContent sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: 0 }}>
                {/* Left: Checkbox + Title */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>

                    <Typography
                        variant="h6"
                        sx={{
                            backgroundColor: cardColor,
                            color: "white",
                            padding: "5px 10px",
                            borderRadius: "10px",
                            fontSize: "12px"
                        }}

                    >
                        {note.category_name}
                    </Typography>
                </Box>

                {/* Right: Edit & Delete buttons */}
                <Box>
                    <Checkbox
                        checked={note.completed}
                        onClick={handleCheckboxChange}
                        sx={{
                            color: "#007BFF", // Blue color
                            '&.Mui-checked': {
                                color: "#007BFF", // Blue when checked
                            },
                            borderRadius: "4px",
                            ml: -1.5
                        }}
                    />
                    <IconButton onClick={handleEdit} sx={{ color: "var(--text-color)", "&:hover": { color: "#FFC110" } }}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleDelete} sx={{ color: "var(--text-color)", "&:hover": { color: "#ff4444" } }}>
                        <DeleteIcon />
                    </IconButton>
                </Box>
            </CardContent>

            <CardContent sx={{
                padding: "8px"
            }}>


                <Typography
                    variant="h6"
                    sx={{
                        textDecoration: note.completed ? "line-through" : "none",
                        color: "var(--text-color)", // Darker text color
                        fontWeight: "bold"
                    }}
                >
                    {note.title}
                </Typography>

            </CardContent>
            {/* Note Details */}
            <CardContent sx={{ textDecoration: note.completed ? "line-through" : "none", flexGrow: 1, padding: "8px !important" }}>

                {note.image_file && (
                    <Box
                        sx={{
                            width: "100%",
                            height: 200,
                            overflow: "hidden",
                            borderRadius: 2,
                            mt: 1,
                            display: "flex",
                            justifyContent: "center",
                            alignItems: "center",
                            bgcolor: "#f0f0f0", // фон для пустых областей
                        }}
                    >
                        <img
                            src={signedUrl}
                            alt="note"
                            onError={() => console.log("❌ ERROR loading image for:", `/images/signed-url/${note.image_file}`)}
                            onLoad={() => console.log("✅ IMG LOADED:", `/images/signed-url/${note.image_file}`)}
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain", // не обрезает, масштабирует под контейнер
                                borderRadius: 10,
                            }}
                        />
                    </Box>
                )}
                <Typography sx={{
                    textAlign: "right",
                    fontSize: "12px",
                    fontStyle: "italic"
                }}
                    variant="body2">
                    {new Date(note.created_at).toLocaleDateString()}{" "}
                    {new Date(note.created_at).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </Typography>
            </CardContent>
        </Card >
    );

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            {card()}
        </Box>
    );
};

export default NoteItem;


