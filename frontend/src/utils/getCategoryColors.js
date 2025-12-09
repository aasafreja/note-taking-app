import { CATEGORY_COLORS } from "../constants/categories";

export const getCategoryColor = (category) => {
    return CATEGORY_COLORS[category] || "transparent";
};

export const formatDateTime = (dateString) => {
    const date = new Date(dateString);
    return {
        date: date.toLocaleDateString(),
        time: date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })
    };
}