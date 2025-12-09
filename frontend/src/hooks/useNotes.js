import { useEffect, useCallback } from "react";
import { useSnackbar } from 'notistack';
import { useDispatch, useSelector } from "react-redux";
import {
    loadedNotes,
    addNote,
    deleteNote,
    editNote,
    selectNotes
} from "../features/notesSlice";
import {
    getNotes,
    addNoteApi,
    updateNoteApi,
    deleteNoteApi
} from "../api/notes";

export const useNotes = () => {
    const { enqueueSnackbar } = useSnackbar();
    const dispatch = useDispatch();
    const notes = useSelector(selectNotes);

    useEffect(() => {
        getNotes().then(data => dispatch(loadedNotes(data)));
    }, [dispatch]);

    const createNote = useCallback(async (note) => {
        const newNote = await addNoteApi(
            note.title,
            note.description,
            note.category,
            note.image_file
        );
        dispatch(addNote(newNote));
        enqueueSnackbar('Note added!', { variant: 'success' });
        return newNote;
    }, [dispatch]);

    const updateNote = useCallback(async (note) => {
        const updated = await updateNoteApi(
            note.id,
            note.title,
            note.description,
            note.category,
            note.image_file
        );
        dispatch(editNote(updated));
        enqueueSnackbar('Note updated!', { variant: 'success' });
        return updated;
    }, [dispatch]);

    const removeNote = useCallback(async (id) => {
        await deleteNoteApi(id);
        dispatch(deleteNote(id));
    }, [dispatch]);

    return {
        notes,
        createNote,
        updateNote,
        removeNote
    };
};
