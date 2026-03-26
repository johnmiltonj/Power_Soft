import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addTask, updateTask, deleteTask } from '../../store/slices/taskSlice';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import TaskForm from './TaskForm';
import { Plus, Edit2, Trash2, Clock, User, FileImage } from 'lucide-react';
import { format } from 'date-fns';

const TaskList = () => {
    const tasks = useSelector((state) => state.tasks.items);
    const projects = useSelector((state) => state.projects.items);
    const employees = useSelector((state) => state.employees.items);
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingTask, setEditingTask] = useState(null);

    const handleOpenModal = (task = null) => {
        if (!task && projects.length === 0) {
            alert("Please create a Project first before adding a Task.");
            return;
        }
        setEditingTask(task);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingTask(null);
        setIsModalOpen(false);
    };

    const handleSubmit = (data) => {
        if (editingTask) {
            dispatch(updateTask({ ...data, id: editingTask.id }));
        } else {
            dispatch(addTask({ ...data, id: uuidv4(), status: 'Need to Do' }));
        }
        handleCloseModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this task?')) {
            dispatch(deleteTask(id));
        }
    };

    const getProjectName = (id) => projects.find(p => p.id === id)?.title || 'Unknown Project';
    const getEmployeeName = (id) => employees.find(e => e.id === id)?.name || 'Unassigned';

    const statusColors = {
        'Need to Do': 'bg-secondary',
        'In Progress': 'bg-primary',
        'Need for Test': 'bg-warning text-dark',
        'Completed': 'bg-success',
        'Re-open': 'bg-danger'
    };

    return (
        <div className="container-fluid">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 pb-3 border-bottom gap-3 w-100">
                <h1 className="h3 mb-0 text-dark fw-bold">Tasks Settings</h1>
                <Button onClick={() => handleOpenModal()} variant="primary" className="d-flex align-items-center justify-content-center gap-2 align-self-stretch align-self-sm-auto">
                    <Plus size={18} /> Add Task
                </Button>
            </div>

            <div className="row g-4">
                {tasks.length === 0 ? (
                    <div className="col-12">
                        <div className="bg-white border rounded p-5 text-center text-muted shadow-sm">
                            <p className="mb-0 fs-5">No tasks found. Add one to get started.</p>
                        </div>
                    </div>
                ) : (
                    tasks.map((task) => (
                        <div key={task.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body d-flex flex-column gap-2">
                                    <div className="d-flex justify-content-between align-items-start gap-2">
                                        <div>
                                            <span className="text-primary text-uppercase fw-bold pb-1 d-block" style={{ fontSize: '0.75rem', letterSpacing: '0.05em' }}>
                                                {getProjectName(task.projectId)}
                                            </span>
                                            <h5 className="card-title fw-bold mb-0 text-dark lh-sm">{task.title}</h5>
                                        </div>
                                        <div className="d-flex gap-1 flex-shrink-0">
                                            <button className="btn btn-sm btn-light text-secondary p-1" onClick={() => handleOpenModal(task)} title="Edit">
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="btn btn-sm btn-light text-danger p-1" onClick={() => handleDelete(task.id)} title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <p className="card-text text-secondary mb-0 mt-2 small flex-grow-1" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {task.description}
                                    </p>

                                    {task.referenceImage && (
                                        <div className="d-inline-flex align-items-center gap-1 text-primary bg-primary bg-opacity-10 px-2 py-1 rounded w-auto mb-2" style={{ fontSize: '0.75rem' }}>
                                            <FileImage size={12} /> View Reference Image
                                        </div>
                                    )}

                                    <div className="border-top pt-3 d-flex flex-column gap-2 mt-auto">
                                        <div className="d-flex align-items-center gap-2 small text-muted">
                                            <User size={14} className="text-secondary" />
                                            <span className="text-truncate">{getEmployeeName(task.assignedEmployeeId)}</span>
                                        </div>
                                        <div className="d-flex align-items-center gap-2 small text-muted">
                                            <Clock size={14} className="text-secondary" />
                                            <span>{task.eta ? format(new Date(task.eta), 'MMM dd, yyyy HH:mm') : 'No ETA'}</span>
                                        </div>
                                    </div>
                                    <div className={`mt-2 align-self-start badge rounded-pill ${statusColors[task.status] || 'bg-secondary'}`}>
                                        {task.status}
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingTask ? 'Edit Task' : 'Add Task'}
            >
                <TaskForm
                    initialData={editingTask}
                    onSubmit={handleSubmit}
                    onCancel={handleCloseModal}
                />
            </Modal>
        </div>
    );
};

export default TaskList;
