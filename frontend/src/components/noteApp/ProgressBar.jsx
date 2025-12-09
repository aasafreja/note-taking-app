import React from 'react'
import { Box, LinearProgress, Typography } from '@mui/material';

const ProgressBar = ({ noteList, category }) => {

    const filteredNotes = category === 'All'
        ? noteList
        : noteList.filter(note => note.category_name === category)

    const totalCount = filteredNotes.length;
    const completedCount = filteredNotes.filter(note => note.completed).length;

    const progress = totalCount ? (completedCount / totalCount) * 100 : 0;

    return (
        <Box sx={{ width: '100%', px: 3, py: 2 }}>
            <Typography variant="subtitle1" gutterBottom>
                You have completed {completedCount}/{totalCount} tasks
            </Typography>
            <Box>
                <Box>
                    <LinearProgress
                        variant="determinate"
                        value={progress}
                        sx={{
                            height: 12,
                            borderRadius: 6,
                            backgroundColor: '#e0e0e0',
                            '& .MuiLinearProgress-bar': {
                                borderRadius: 6,
                                backgroundColor: '#1976d2',
                            }
                        }} />
                </Box>
            </Box>
        </Box>
    )
}

export default ProgressBar
