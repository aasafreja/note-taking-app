const API_ENDPOINT = "http://localhost:3000"

export const registerUser = async (name, email, password) => {
    const response = await fetch(`${API_ENDPOINT}/users/register`, {
        method: "POST",
        body: JSON.stringify({
            name,
            email,
            password
        }),
        headers: {
            "Content-Type": "application/json",
        },
        credentials: 'include'
    })
    const data = await response.json();
    if (!response.ok) {
        if (data.errors) {
            const messages = data.errors.map(err => err.msg).join(', ');
            throw new Error(messages);
        }
        throw new Error(data.message || 'Registration failed');
    }

    return data;
}

export const loginUser = async (email, password) => {
    try {
        const response = await fetch(`${API_ENDPOINT}/users/login`, {
            method: "POST",
            body: JSON.stringify({
                email, password
            }),
            headers: {
                "Content-Type": "application/json",
            },
            credentials: 'include'
        })

        const data = await response.json();
        if (!response.ok) {
            return { error: data.message || 'Login failed' };
        }
        return data;

    } catch (err) {
        console.error("Error:", err);
        return { error: 'Network error' };
    }
}

export const logoutUser = async () => {
    const response = await fetch(`${API_ENDPOINT}/users/logout`, {
        method: 'GET',
        credentials: 'include',
    });

    if (!response.ok) {
        throw new Error('Logout failed');
    }

    return await response.json();
}


export const fetchUser = async () => {
    const response = await fetch(`${API_ENDPOINT}/users/user`, {
        credentials: 'include',
    });


    if (!response.ok) {
        throw new Error('Please log in.');
    }

    return await response.json()
}