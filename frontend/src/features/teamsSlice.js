import { createSlice } from "@reduxjs/toolkit";

export const teamsSlice = createSlice({
    name: 'teams',
    initialState: {
        teams: []
    },
    reducers: {
        loadedTeams(state, action) {
            state.teams = action.payload
        },
        addTeam: (state, action) => {
            state.teams.unshift(action.payload);
        },
        deleteTeam: (state, action) => {
            state.teams = state.teams.filter(team => team.id !== action.payload);
        }
    }
})

export const { loadedTeams, addTeam, deleteTeam } = teamsSlice.actions
export const selectTeams = (state) => state.teams.teams
export default teamsSlice.reducer
