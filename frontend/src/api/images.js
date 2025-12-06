const API_ENDPOINT = "http://localhost:3000/images";

// Cash in order to save image urls
const signedUrlCache = {};


export const uploadImageApi = async (imageFile) => {
    const formData = new FormData();
    formData.append("image", imageFile);

    const response = await fetch(`${API_ENDPOINT}/upload`, {
        method: "POST",
        body: formData,
        credentials: 'include',
    });

    if (!response.ok) throw new Error("Failed to upload image");

    const data = await response.json();
    return data.fileName;
}

export const getImageUrl = async (fileName) => {
    if (!fileName) return null;

    if (signedUrlCache[fileName]) {
        return signedUrlCache[fileName];
    }

    try {
        const response = await fetch(`${API_ENDPOINT}/signed-url/${fileName}`, {
            credentials: 'include',
        });

        if (!response.ok) throw new Error("Failed to fetch signed URL");

        const data = await response.json();

        signedUrlCache[fileName] = data.url;

        return data.url;

    } catch (err) {
        console.error("❌ getImageUrl error:", err);
        return null;
    }
};
