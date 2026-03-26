# Project Management Dashboard

A modern, responsive Project Management Dashboard built with React, Redux Toolkit, React Hook Form, and `@dnd-kit`.

## Features
- **Employee Management**: Create, view, edit, and delete employees. Profile images supported via local browser storage preview. Unique email validation.
- **Project Management**: Create projects with custom logos and assign multiple employees.
- **Task Management**: Create tasks, assign them to employees belonging to a specific project, set ETAs, and upload reference images.
- **Kanban Dashboard**: Interactive drag-and-drop board. Filter tasks by project or view all tasks across 5 customizable columns (Need to Do, In Progress, Need for Test, Completed, Re-open).

## Tech Stack
- Frontend: React 18 (Vite)
- State Management: Redux Toolkit
- Routing: React Router DOM v6
- Forms & Validation: React Hook Form + Yup
- Drag & Drop: `@dnd-kit/core`, `@dnd-kit/sortable`
- Styles: Custom Vanilla CSS (Modern CSS variables, Dark Mode aesthetic)

## Getting Started

1. **Install Dependencies**
   ```bash
   npm install
   ```
2. **Start the Development Server**
   ```bash
   npm run dev
   ```

## Development Notes
- The application uses local state initialized on a per-session basis via Redux Toolkit.
- Built without external UI frameworks like Tailwind/Material UI for maximum control and premium aesthetic using standard flex/grid CSS layouts.
