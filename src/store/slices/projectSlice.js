import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

const projectSlice = createSlice({
    name: 'projects',
    initialState,
    reducers: {
        addProject: (state, action) => {
            state.items.push(action.payload);
        },
        updateProject: (state, action) => {
            const index = state.items.findIndex((proj) => proj.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteProject: (state, action) => {
            state.items = state.items.filter((proj) => proj.id !== action.payload);
        },
    },
});

export const { addProject, updateProject, deleteProject } = projectSlice.actions;
export default projectSlice.reducer;
