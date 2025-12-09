import { API_ENDPOINT } from "./index";

export const getNotes = async () => {
    const response = await fetch(`${API_ENDPOINT}/notes`, {
        credentials: 'include', // This ensures the session cookie is sent with the request
    });
    const notes = await response.json();
    return notes;
}

export const getCategories = async () => {
    const response = await fetch(`${API_ENDPOINT}/notes/categories`, {
        credentials: 'include', // Add this to send the session cookie
    });
    const categories = await response.json();
    return categories;
}

export const deleteNoteApi = async (id) => {
    const response = await fetch(`${API_ENDPOINT}/notes/${id}`, {
        method: "DELETE",
        credentials: 'include', // Add this to send the session cookie
    });
    return response.status;
}


export const updateNoteApi = async (id, title, desc, category, imageFileName = null) => {
    const response = await fetch(`${API_ENDPOINT}/notes/${id}`, {
        method: "PUT",
        body: JSON.stringify({
            title,
            desc,
            category,
            image_file: imageFileName,
        }),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include', // Add this to send the session cookie
    });

    if (!response.ok) throw new Error("Failed to update note");

    const updatedNote = await response.json();
    return updatedNote;
}


export const addNoteApi = async (title, desc, category, imageFileName = null) => {
    const response = await fetch(`${API_ENDPOINT}/notes`, {
        method: "POST",
        body: JSON.stringify({
            title,
            desc,
            category,
            image_file: imageFileName,
        }),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include', // Add this to send the session cookie
    });

    const newNote = await response.json();
    return newNote;
}

export const toggleCompletedApi = async (id) => {
    const response = await fetch(`${API_ENDPOINT}/notes/${id}/toggle`, {
        method: "PATCH",
        credentials: 'include', // Add this to send the session cookie
    });

    if (!response.ok) {
        throw new Error("Failed to toggle note completion");
    }

    return await response.json();
}
