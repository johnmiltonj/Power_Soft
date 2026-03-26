import { configureStore } from '@reduxjs/toolkit';
import employeeReducer from './slices/employeeSlice';
import projectReducer from './slices/projectSlice';
import taskReducer from './slices/taskSlice';

export const store = configureStore({
  reducer: {
    employees: employeeReducer,
    projects: projectReducer,
    tasks: taskReducer,
  },
});
