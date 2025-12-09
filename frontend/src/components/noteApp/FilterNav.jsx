import React from 'react'
import { Box, Button, List, ListItem, ListItemButton, Typography } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { CATEGORIES } from "../../constants/categories";
import { getCategoryColor } from "../../utils/getCategoryColors"


const FilterNav = ({ onCategoryClick, addModal, selectedCategory }) => {
    const menuCategories = Object.values(CATEGORIES);

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
                                backgroundColor: selectedCategory === category ? "rgba(0,0,0,0.1)" : "transparent",
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
                    onClick={() => addModal.open()}
                    sx={{
                        borderRadius: "6px",
                        padding: "10px 20px",
                        fontWeight: "bold",

                        '&:active': {
                            backgroundColor: "#e6b800",
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






