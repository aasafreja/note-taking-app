import React from 'react';
import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
    Button,
    Typography
} from '@mui/material';

const DeleteConfirmDialog = ({ open, title, onCancel, onConfirm }) => {
    return (
        <Dialog open={open} onClose={onCancel}>
            <DialogTitle>Delete Note?</DialogTitle>
            <DialogContent>
                <Typography>
                    Are you sure you want to delete <strong>“{title}”</strong>? <br />
                    This action cannot be undone.
                </Typography>
            </DialogContent>
            <DialogActions>
                <Button onClick={onCancel}>Cancel</Button>
                <Button onClick={onConfirm} color="error" variant="contained">
                    Delete
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default DeleteConfirmDialog;
