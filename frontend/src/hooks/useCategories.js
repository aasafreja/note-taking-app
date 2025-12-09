import { useEffect, useState } from "react";
import { getCategories } from "../api/notes";

export const useCategories = () => {
    const [categories, setCategories] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        const load = async () => {
            setLoading(true);
            try {
                const data = await getCategories();
                setCategories(data || []);
            } catch (e) {
                console.error("Failed to load categories", e);
            } finally {
                setLoading(false);
            }
        };

        load();
    }, []);

    return { categories, loading };
};
