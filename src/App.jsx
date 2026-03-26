import { Routes, Route, Navigate } from 'react-router-dom';
import Layout from './components/layout/Layout';
import EmployeeList from './features/employees/EmployeeList';
import ProjectList from './features/projects/ProjectList';
import TaskList from './features/tasks/TaskList';
import Dashboard from './features/dashboard/Dashboard';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        <Route index element={<Navigate to="/dashboard" replace />} />
        <Route path="dashboard" element={<Dashboard />} />
        <Route path="employees" element={<EmployeeList />} />
        <Route path="projects" element={<ProjectList />} />
        <Route path="tasks" element={<TaskList />} />
      </Route>
    </Routes>
  );
}

export default App;
