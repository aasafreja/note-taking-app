import { Box, Typography, IconButton } from '@mui/material'
import CloseIcon from '@mui/icons-material/Close';
import ReactMarkdown from "react-markdown";
import { getImageUrl } from '../../api/images';
import { useState, useEffect } from 'react';
import MarkdownImage from './MarkdownImage';

const FullNote = ({ note, onCloseFullNote }) => {

    return (
        <Box sx={{
            maxHeight: "80vh",
            overflowY: "auto",
            paddingRight: "10px"
        }}>
            <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                <Typography variant="h5" sx={{ fontWeight: "bold" }}>{note.title}</Typography>
                <IconButton onClick={onCloseFullNote}>
                    <CloseIcon />
                </IconButton>
            </Box>

            <Typography variant="subtitle2" sx={{ mb: 2, fontStyle: "italic", color: "gray" }}>
                {new Date(note.created_at).toLocaleDateString()}{" "}
                {new Date(note.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
            </Typography>


            <ReactMarkdown components={{
                a: ({ node, ...props }) => (
                    <a
                        {...props}
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{ color: "#1976d2", textDecoration: "underline" }}
                    />
                ),
                img: MarkdownImage
            }}>
                {note.description}
            </ReactMarkdown>
        </Box>
    );
};

export default FullNote;
