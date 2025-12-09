import React from 'react'
import { Grid, Typography, Box } from '@mui/material';
import NoteItem from '../noteApp/NoteItem'
import emptyNotes from '../../../public/img/emptyNotes.svg'


const NoteList = ({ notes, onDeleteNote, onEditNote, onOpenFullNote }) => {
    if (!notes || notes.length === 0) {
        return (
            <Box textAlign="center" mt={4}>
                <Typography variant="h5">No notes found</Typography>
                <img src={emptyNotes} alt="No Notes" width={200} />
            </Box>
        );
    }

    return (
        <Grid container spacing={3} columns={{ xs: 1, sm: 3, md: 4 }}>
            {notes.map((note) => (
                <Grid xs={1} key={note.id}>
                    <NoteItem
                        note={note}
                        onDeleteNote={onDeleteNote}
                        onEditNote={onEditNote}
                        onOpenFullNote={onOpenFullNote}
                    />
                </Grid>
            ))}
        </Grid>
    );
};


export default NoteList



