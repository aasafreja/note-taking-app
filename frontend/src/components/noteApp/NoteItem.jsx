import React, { useEffect, useState } from 'react';
import { useDispatch } from "react-redux";
import { toggleCompleted } from '../../features/notesSlice';
import { toggleCompletedApi } from '../../api/notes';
import { Card, CardContent, Box, Typography, Checkbox, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import { getCategoryColor } from "../../utils/getCategoryColors"
import { formatDateTime } from '../../utils/getCategoryColors';
import { getImageUrl } from '../../api/images'
import DeleteConfirmDialog from './ui/DeleteConfirmDialog';



const NoteItem = ({ note, onDeleteNote, onEditNote, onOpenFullNote }) => {

    const [deleteConfirm, setDeleteConfirm] = useState(false);
    const [signedUrl, setSignedUrl] = useState(null);
    const { date, time } = formatDateTime(note.created_at);

    useEffect(() => {
        if (!note.image_file) return;

        getImageUrl(note.image_file).then(url => setSignedUrl(url));
    }, [note.image_file]);


    const dispatch = useDispatch();
    const cardColor = getCategoryColor(note.category_name);

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        setDeleteConfirm(true);
    };

    const confirmDelete = async () => {
        await onDeleteNote(note.id);
        setDeleteConfirm(false);
    };

    const cancelDelete = () => {
        setDeleteConfirm(false);
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
                backgroundColor: "white",
                color: "var(--text-color)",
                borderRadius: 2,
                boxShadow: 3,
                padding: 2,
                width: "100%",
                minWidth: 300,
                maxWidth: 400,
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
                            color: "#007BFF",
                            '&.Mui-checked': {
                                color: "#007BFF",
                            },
                            borderRadius: "4px",
                            ml: -1.5
                        }}
                    />
                    <IconButton onClick={handleEdit} sx={{ color: "var(--text-color)", "&:hover": { color: "#FFC110" } }}>
                        <EditIcon />
                    </IconButton>
                    <IconButton onClick={handleDeleteClick} sx={{ color: "var(--text-color)", "&:hover": { color: "#ff4444" } }}>
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
                        color: "var(--text-color)",
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
                            bgcolor: "#f0f0f0",
                        }}
                    >
                        <img
                            src={signedUrl}
                            alt="note"
                            style={{
                                maxWidth: "100%",
                                maxHeight: "100%",
                                objectFit: "contain",
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
                    {date}
                    {time}
                </Typography>
            </CardContent>
        </Card >
    );

    return (
        <Box sx={{ display: "flex", justifyContent: "center" }}>
            {card()}
            <DeleteConfirmDialog
                open={deleteConfirm}
                title={note.title}
                onCancel={cancelDelete}
                onConfirm={confirmDelete}
            />
        </Box>
    );
};

export default NoteItem;


