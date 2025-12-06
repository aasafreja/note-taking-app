import React, { useState, useEffect } from 'react'
import { getCategories } from '../../api/notes';
import { Box, Button, List, ListItem, ListItemButton, ListItemText, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';

const getCategoryColor = (category) => {
    const colorMap = {
        Personal: "var(--personal-color)",
        Home: "var(--home-color)",
        Business: "var(--business-color)",
    };
    return colorMap[category] || "transparent";
};

const FilterNav = ({ onCategoryClick, setAddFormVisible, addFormVisible, categories, selectedCategory }) => {


    const menuCategories = ["All", ...categories.map(c => c.name)];

    return (
        <Box sx={{
            display: "flex",
            justifyContent: "space-between",

        }}>
            <List sx={{ display: "flex", gap: 1, padding: 0 }}>
                {menuCategories.map((category) => (
                    <ListItem key={category}>
                        <ListItemButton onClick={() => onCategoryClick(category)}
                            sx={{
                                color: "var(--text-color)",
                                borderRadius: "6px",
                                padding: "6px 12px",
                                display: "flex",
                                flexDirection: "column",
                                backgroundColor: selectedCategory === category ? "rgba(0,0,0,0.1)" : "transparent", // active style
                                "&:hover": { backgroundColor: "rgba(255,255,255,0.2)" },
                            }}>
                            <Typography variant="body1" fontWeight="bold">{category}

                            </Typography>
                            {category !== "All" && (
                                <Box
                                    sx={{
                                        width: 10,
                                        height: 10,
                                        borderRadius: "50%",
                                        backgroundColor: getCategoryColor(category),
                                        mt: "4px"
                                    }}
                                />
                            )}
                        </ListItemButton>
                    </ListItem>
                ))}
            </List>
            <Box sx={{
                display: "flex",
                flexDirection: "column"
            }}>
                <Button
                    onClick={() => setAddFormVisible(!addFormVisible)}
                    sx={{
                        borderRadius: "6px",
                        padding: "10px 20px",
                        fontWeight: "bold",

                        '&:active': {
                            backgroundColor: "#e6b800", // Darken the yellow on click
                        }
                    }}
                    startIcon={<AddIcon />}
                >
                    Add Note
                </Button>
            </Box>
        </Box >
    )
}

export default FilterNav






