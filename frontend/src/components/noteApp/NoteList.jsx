import React from 'react'
import { Grid, Typography, Box } from '@mui/material';
import NoteItem from '../noteApp/NoteItem'
import emptyNotes from '../../../public/img/emptyNotes.svg'
import searchImage from '../../../public/img/search-image.svg'

const NoteList = ({ notes, onDeleteNote, category, onEditNote, onOpenFullNote }) => {

    const filteredNotes = category === 'All'
        ? notes
        : notes.filter(note => note.category_name === category)

    const renderNotes = () => {
        if (category !== "All" && filteredNotes.length === 0) {
            return (
                <Box textAlign="center" mt={4}>
                    <Typography variant="h5">Couldn't find any notes</Typography>
                    <img src={searchImage} alt="No Notes Found" width={200} />
                </Box>
            );
        }

        if (notes.length === 0) {
            return (
                <Box textAlign="center" mt={4}>
                    <Typography variant="h5">You don't have any notes</Typography>
                    <img src={emptyNotes} alt="No Notes" width={200} />
                </Box>
            );
        }

        return (
            <Grid container spacing={3} columns={{ xs: 1, sm: 3, md: 4 }}>
                {filteredNotes.map((note) => (
                    <Grid xs={1} key={note.id}>
                        <NoteItem note={note} onDeleteNote={onDeleteNote} onEditNote={onEditNote} onOpenFullNote={onOpenFullNote}
                        />
                    </Grid>
                ))}
            </Grid>
        );
    };

    return (
        <Box>{renderNotes()}</Box>
    )
}

export default NoteList



