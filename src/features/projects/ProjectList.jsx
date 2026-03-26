import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addProject, updateProject, deleteProject } from '../../store/slices/projectSlice';
import { deleteTasksByProjectId } from '../../store/slices/taskSlice';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import ProjectForm from './ProjectForm';
import { Plus, Edit2, Trash2, Calendar, Users } from 'lucide-react';
import { format } from 'date-fns';

const ProjectList = () => {
    const projects = useSelector((state) => state.projects.items);
    const employees = useSelector((state) => state.employees.items);
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingProject, setEditingProject] = useState(null);

    const handleOpenModal = (project = null) => {
        setEditingProject(project);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingProject(null);
        setIsModalOpen(false);
    };

    const handleSubmit = (data) => {
        if (editingProject) {
            dispatch(updateProject({ ...data, id: editingProject.id }));
        } else {
            dispatch(addProject({ ...data, id: uuidv4() }));
        }
        handleCloseModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this project? Associated tasks will also be deleted.')) {
            dispatch(deleteProject(id));
            dispatch(deleteTasksByProjectId(id));
        }
    };

    const getAssignedEmployeeNames = (ids = []) => {
        if (!ids || ids.length === 0) return 'None';
        return ids.map(id => employees.find(e => e.id === id)?.name).filter(Boolean).join(', ');
    };

    return (
        <div className="container-fluid">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 pb-3 border-bottom gap-3 w-100">
                <h1 className="h3 mb-0 text-dark fw-bold">Projects</h1>
                <Button onClick={() => handleOpenModal()} variant="primary" className="d-flex align-items-center justify-content-center gap-2 align-self-stretch align-self-sm-auto">
                    <Plus size={18} /> Add Project
                </Button>
            </div>

            <div className="row g-4">
                {projects.length === 0 ? (
                    <div className="col-12">
                        <div className="bg-white border rounded p-5 text-center text-muted shadow-sm">
                            <p className="mb-0 fs-5">No projects found. Add one to get started.</p>
                        </div>
                    </div>
                ) : (
                    projects.map((proj) => (
                        <div key={proj.id} className="col-12 col-lg-6 col-xl-4">
                            <div className="card h-100 shadow-sm border-0 border-top border-4 border-primary">
                                <div className="card-body d-flex flex-column gap-3">
                                    <div className="d-flex justify-content-between align-items-start gap-3">
                                        <div className="d-flex align-items-center gap-3">
                                            <div className="bg-light p-2 rounded border" style={{ width: '60px', height: '60px' }}>
                                                <img src={proj.logo} alt="logo" className="w-100 h-100 object-fit-contain" />
                                            </div>
                                            <h4 className="card-title fw-bold mb-0 text-truncate" style={{ maxWidth: '200px' }} title={proj.title}>{proj.title}</h4>
                                        </div>
                                        <div className="d-flex gap-1 flex-shrink-0">
                                            <button className="btn btn-sm btn-light text-secondary p-1" onClick={() => handleOpenModal(proj)} title="Edit">
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="btn btn-sm btn-light text-danger p-1" onClick={() => handleDelete(proj.id)} title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>

                                    <p className="card-text text-secondary mb-0 flex-grow-1" style={{ display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                                        {proj.description}
                                    </p>

                                    <div className="pt-3 border-top d-flex flex-column gap-2 mt-auto">
                                        <div className="d-flex align-items-center gap-2 small text-muted">
                                            <Calendar size={14} className="text-secondary" />
                                            <span>{format(new Date(proj.startDate), 'MMM dd, yyyy')} - {format(new Date(proj.endDate), 'MMM dd, yyyy')}</span>
                                        </div>
                                        <div className="d-flex align-items-center gap-2 small text-muted">
                                            <Users size={14} className="text-secondary" />
                                            <span className="text-truncate" style={{ maxWidth: '280px' }} title={getAssignedEmployeeNames(proj.assignedEmployeeIds)}>
                                                {proj.assignedEmployeeIds?.length || 0} Members assigned
                                            </span>
                                        </div>
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
                title={editingProject ? 'Edit Project' : 'Add Project'}
            >
                <ProjectForm
                    initialData={editingProject}
                    onSubmit={handleSubmit}
                    onCancel={handleCloseModal}
                />
            </Modal>
        </div>
    );
};

export default ProjectList;
