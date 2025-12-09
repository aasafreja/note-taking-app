import { useState } from 'react'
import { Modal, Box } from '@mui/material';

import SearchBar from '../components/noteApp/SearchBar'
import FilterNav from '../components/noteApp/FilterNav'
import NoteList from '../components/noteApp/NoteList'
import ProgressBar from '../components/noteApp/ProgressBar'
import NoteForm from '../components/noteApp/NoteForm'
import UserProfile from '../components/auth/UserProfile';
import FullNote from '../components/noteApp/FullNote';

import useModal from '../hooks/useModal';
import { useNotes } from '../hooks/useNotes';
import { useCategories } from '../hooks/useCategories';

function Dashboard() {

    const { notes, createNote, updateNote, removeNote } = useNotes();
    const { categories } = useCategories();

    const [category, setCategory] = useState('All')
    const [searchString, setSearchString] = useState('')

    const addModal = useModal();
    const editModal = useModal();
    const fullNoteModal = useModal();

    const handleAddNote = async (note) => {
        await createNote(note)
        addModal.close();

    };

    const handleUpdateNote = async (note) => {
        await updateNote(note)
        editModal.close();
    }

    const handleDeleteNote = async (id) => await removeNote(id)

    const handleEditNote = (note) => editModal.open(note);
    const handleCategoryClick = (category) => setCategory(category);
    const handleSearch = (query) => setSearchString(query);
    const handleOpenFullNote = (note) => fullNoteModal.open(note);


    const filteredNotes = notes
        .filter(note => note.title.toLowerCase().includes(searchString.toLowerCase())
            || note.description.toLowerCase().includes(searchString.toLowerCase()))
        .filter(note => category === 'All' || note.category_name === category)

    return (
        <div className='app'>
            <UserProfile />
            <SearchBar onSearch={handleSearch} />
            <FilterNav onCategoryClick={handleCategoryClick}
                addModal={addModal}
                selectedCategory={category} />

            {/* Add Note Modal */}
            <Modal open={addModal.isOpen} onClose={addModal.close}>
                <Box>
                    <NoteForm
                        onAddNote={handleAddNote}
                        onCancel={addModal.close}
                        categories={categories}
                    />
                </Box>
            </Modal>

            {/* Edit Note Modal */}
            <Modal open={editModal.isOpen} onClose={editModal.close}>
                <Box>
                    <NoteForm
                        onAddNote={handleUpdateNote}
                        onCancel={editModal.close}
                        noteToEdit={editModal.data}
                        categories={categories}
                    />
                </Box>
            </Modal>

            <Modal open={fullNoteModal.isOpen} onClose={fullNoteModal.close}>
                <Box sx={{ maxWidth: 600, margin: "auto", mt: 5, p: 3, bgcolor: "white", borderRadius: 2 }}>
                    {fullNoteModal.data && <FullNote
                        note={fullNoteModal.data}
                        onCloseFullNote={fullNoteModal.close} />}
                </Box>
            </Modal>

            <ProgressBar noteList={notes} category={category} />
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



