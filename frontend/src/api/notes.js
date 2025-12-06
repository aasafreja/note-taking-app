const API_ENDPOINT = "http://localhost:3000/notes";

export const getNotes = async () => {
    const response = await fetch(`${API_ENDPOINT}`, {
        credentials: 'include', // This ensures the session cookie is sent with the request
    });
    const notes = await response.json();
    return notes;
}

export const getCategories = async () => {
    const response = await fetch(`${API_ENDPOINT}/categories`, {
        credentials: 'include', // Add this to send the session cookie
    });
    const categories = await response.json();
    return categories;
}

export const deleteNoteApi = async (id) => {
    const response = await fetch(`${API_ENDPOINT}/${id}`, {
        method: "DELETE",
        credentials: 'include', // Add this to send the session cookie
    });
    return response.status;
}


export const updateNoteApi = async (id, title, desc, category, imageFileName = null) => {
    const response = await fetch(`${API_ENDPOINT}/${id}`, {
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
    const response = await fetch(`${API_ENDPOINT}`, {
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
    const response = await fetch(`${API_ENDPOINT}/${id}/toggle`, {
        method: "PATCH",
        credentials: 'include', // Add this to send the session cookie
    });

    if (!response.ok) {
        throw new Error("Failed to toggle note completion");
    }

    return await response.json();
}
