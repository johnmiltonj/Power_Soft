import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

const taskSlice = createSlice({
    name: 'tasks',
    initialState,
    reducers: {
        addTask: (state, action) => {
            state.items.push(action.payload);
        },
        updateTask: (state, action) => {
            const index = state.items.findIndex((task) => task.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        updateTaskStatus: (state, action) => {
            const { id, status } = action.payload;
            const task = state.items.find((t) => t.id === id);
            if (task) {
                task.status = status;
            }
        },
        deleteTask: (state, action) => {
            state.items = state.items.filter((task) => task.id !== action.payload);
        },
        deleteTasksByProjectId: (state, action) => {
            state.items = state.items.filter((task) => task.projectId !== action.payload);
        }
    },
});

export const { addTask, updateTask, updateTaskStatus, deleteTask, deleteTasksByProjectId } = taskSlice.actions;
export default taskSlice.reducer;
