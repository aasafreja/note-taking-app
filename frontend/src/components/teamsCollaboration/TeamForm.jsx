import { useState } from "react";
import { Box, TextField, Button, Typography, Chip, Autocomplete } from "@mui/material";

export default function CreateTeamForm({ onCancel }) {
    const [teamName, setTeamName] = useState("");
    const [members, setMembers] = useState([]);
    const [description, setDescription] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log({
            teamName,
            members, // массив всех email-ов
            description,
        });
        // здесь логика отправки на сервер
    };

    return (
        <Box
            sx={{
                margin: "0 auto",
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "background.paper",
                boxShadow: 24,
                p: 4,
                borderRadius: 3,
                width: "90%",
                maxWidth: 500,
            }}
        >
            <Typography variant="h5" gutterBottom>
                Create New Team
            </Typography>

            <form onSubmit={handleSubmit}>
                <TextField
                    fullWidth
                    label="Team Name"
                    value={teamName}
                    onChange={(e) => setTeamName(e.target.value)}
                    margin="normal"
                />

                {/* Members */}
                <Autocomplete
                    multiple
                    freeSolo
                    options={[]} // нет заранее заданного списка
                    value={members}
                    onChange={(event, newValue) => setMembers(newValue)}
                    renderTags={(value, getTagProps) =>
                        value.map((option, index) => (
                            <Chip
                                key={index}
                                variant="outlined"
                                label={option}
                                {...getTagProps({ index })}
                            />
                        ))
                    }
                    renderInput={(params) => (
                        <TextField
                            {...params}
                            label="Add Members (email)"
                            placeholder="Type email and press Enter"
                            margin="normal"
                        />
                    )}
                />

                <TextField
                    fullWidth
                    multiline
                    rows={4}
                    label="Description"
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                    margin="normal"
                />

                <Box sx={{ display: "flex", gap: 2, mt: 2 }}>
                    <Button type="submit" variant="contained" color="primary">
                        Create Team
                    </Button>
                    <Button variant="outlined" color="secondary" onClick={onCancel}>
                        Cancel
                    </Button>
                </Box>
            </form>
        </Box>
    );
}
