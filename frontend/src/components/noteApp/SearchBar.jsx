import React from 'react';
import { TextField, InputAdornment, Box } from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';

const SearchBar = ({ onSearch }) => {
    return (
        <Box sx={{ maxWidth: 600, mx: 'auto', my: 2 }}>
            <TextField
                fullWidth
                variant="outlined"
                placeholder="Search notes..."
                onChange={(e) => onSearch(e.target.value)}
                InputProps={{
                    startAdornment: (
                        <InputAdornment position="start">
                            <SearchIcon color="action" />
                        </InputAdornment>
                    ),
                }}
                sx={{
                    backgroundColor: 'white',
                    boxShadow: 1,
                }}
            />
        </Box>
    );
};

export default SearchBar;
