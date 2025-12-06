import { createSlice } from "@reduxjs/toolkit";

export const notesSlice = createSlice({
    name: 'notes',
    initialState: {
        notes: []
    },
    reducers: {
        loadedNotes(state, action) {
            state.notes = action.payload
        },
        addNote: (state, action) => {
            state.notes.unshift(action.payload);
        },
        deleteNote: (state, action) => {
            state.notes = state.notes.filter(note => note.id !== action.payload);
        },
        toggleCompleted: (state, action) => {
            const note = state.notes.find(note => note.id === action.payload)
            if (note) {
                note.completed = !note.completed
            }
        },
        editNote: (state, action) => {
            const updatedNote = action.payload
            const index = state.notes.findIndex(note => note.id === updatedNote.id)
            if (index !== -1) {
                state.notes[index] = {
                    ...state.notes[index], // preserve completed, created_at
                    ...updatedNote
                };
            }
        }
    }
})

export const { loadedNotes, addNote, deleteNote, toggleCompleted, editNote } = notesSlice.actions
export const selectNotes = (state) => state.notes.notes
export default notesSlice.reducer
