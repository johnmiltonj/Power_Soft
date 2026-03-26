import { createSlice } from '@reduxjs/toolkit';

const initialState = {
    items: [],
};

const employeeSlice = createSlice({
    name: 'employees',
    initialState,
    reducers: {
        addEmployee: (state, action) => {
            state.items.push(action.payload);
        },
        updateEmployee: (state, action) => {
            const index = state.items.findIndex((emp) => emp.id === action.payload.id);
            if (index !== -1) {
                state.items[index] = action.payload;
            }
        },
        deleteEmployee: (state, action) => {
            state.items = state.items.filter((emp) => emp.id !== action.payload);
        },
    },
});

export const { addEmployee, updateEmployee, deleteEmployee } = employeeSlice.actions;
export default employeeSlice.reducer;
