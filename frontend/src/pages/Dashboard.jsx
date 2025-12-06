import { useState, useEffect } from 'react'
import { Modal, Box } from '@mui/material';
import SearchBar from '../components/noteApp/SearchBar'
import FilterNav from '../components/noteApp/FilterNav'
import NoteList from '../components/noteApp/NoteList'
import ProgressBar from '../components/noteApp/ProgressBar'
import NoteForm from '../components/noteApp/NoteForm'
import UserProfile from '../components/auth/UserProfile';
import FullNote from '../components/noteApp/FullNote';

import { useDispatch, useSelector } from 'react-redux';
import { loadedNotes, addNote, deleteNote, editNote } from '../features/notesSlice';
import { selectNotes } from '../features/notesSlice';
import { getNotes, deleteNoteApi, addNoteApi, updateNoteApi, getCategories } from '../api/notes';





function Dashboard() {

    const dispatch = useDispatch()
    const notesList = useSelector(selectNotes)

    const [categoriesList, setCategoriesList] = useState([]);


    useEffect(() => {
        async function fetchCategories() {
            const catData = await getCategories();
            setCategoriesList(catData);
        }
        fetchCategories();
    }, []);

    useEffect(() => {
        async function fetchData() {
            const notesData = await getNotes();
            dispatch(loadedNotes(notesData))
        }
        fetchData();
    }, [dispatch])

    useEffect(() => {
        console.log("Notes list updated:", notesList);
    }, [notesList]);

    const [category, setCategory] = useState('All')
    const [searchString, setSearchString] = useState('')
    const [addFormVisible, setAddFormVisible] = useState(false)
    const [fullNoteVisible, setFullNoteVisible] = useState(false);
    const [selectedNote, setSelectedNote] = useState(null);

    const [editFormVisible, setEditFormVisible] = useState(false);
    const [currentNote, setCurrentNote] = useState(null);

    const handleAddNote = async (note) => {
        try {
            const newNote = await addNoteApi(note.title, note.description, note.category, note.image_file);
            dispatch(addNote(newNote))
            setAddFormVisible(false);
        } catch (err) {
            console.error("Failed to add note:", err);
            alert("Something went wrong while adding the note.");
        }
    };

    const handleUpdateNote = async (note) => {
        try {
            const updatedNote = await updateNoteApi(
                note.id,
                note.title,
                note.description,
                note.category,
                note.image_file
            );

            dispatch(editNote(updatedNote));
            setEditFormVisible(false);
        } catch (err) {
            console.error("Failed to update note:", err);
            alert("Something went wrong while updating the note.");
        }
    }

    const handleEditNote = (note) => {
        setCurrentNote(note)
        setEditFormVisible(true)

    }

    const handleCategoryClick = (category) => {
        setCategory(category)
    }

    const handleSearch = (query) => {
        setSearchString(query)

    }

    const handleDeleteNote = async (id) => {
        //dispatch(deleteNote(id)) -> this if we use just redux
        const responseStatus = await deleteNoteApi(id)
        if (responseStatus !== 200) {
            alert("Deleting failed");
            return;
        }
        dispatch(deleteNote(id))
    }

    const handleOpenFullNote = (note) => {
        setSelectedNote(note);
        setFullNoteVisible(true);
    };

    const handleCloseFullNote = () => {
        setFullNoteVisible(false);
        setSelectedNote(null);
    };

    const filteredNotes = notesList
        .filter(note => note.title.toLowerCase().includes(searchString.toLowerCase())
            || note.description.toLowerCase().includes(searchString.toLowerCase()))
        .filter(note => category === 'All' || note.category_name === category)



    return (
        <div className='app'>
            <UserProfile />
            <SearchBar onSearch={handleSearch} />
            <FilterNav onCategoryClick={handleCategoryClick} setAddFormVisible={setAddFormVisible} addFormVisible={addFormVisible}
                categories={categoriesList} selectedCategory={category} />

            <Modal open={addFormVisible} onClose={() => setAddFormVisible(false)}>
                <Box>
                    <NoteForm
                        onAddNote={handleAddNote}
                        onCancel={() => setAddFormVisible(false)}
                        categories={categoriesList}
                    />
                </Box>
            </Modal>

            <Modal open={editFormVisible} onClose={() => setEditFormVisible(false)}>
                <Box>
                    <NoteForm
                        onAddNote={handleUpdateNote}
                        onCancel={() => setEditFormVisible(false)}
                        noteToEdit={currentNote}
                        categories={categoriesList}
                    />
                </Box>
            </Modal>

            <Modal open={fullNoteVisible} onClose={handleCloseFullNote}>
                <Box sx={{ maxWidth: 600, margin: "auto", mt: 5, p: 3, bgcolor: "white", borderRadius: 2 }}>
                    {selectedNote && <FullNote note={selectedNote} onCloseFullNote={handleCloseFullNote} />}
                </Box>
            </Modal>

            <ProgressBar noteList={notesList} category={category} />
            <NoteList notes={filteredNotes}
                onDeleteNote={handleDeleteNote}
                category={category}
                onEditNote={handleEditNote}
                onOpenFullNote={handleOpenFullNote}
            />
        </div>
    )
}

export default Dashboard



