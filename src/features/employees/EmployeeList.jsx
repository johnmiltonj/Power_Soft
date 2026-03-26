import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { v4 as uuidv4 } from 'uuid';
import { addEmployee, updateEmployee, deleteEmployee } from '../../store/slices/employeeSlice';
import Button from '../../components/common/Button';
import Modal from '../../components/common/Modal';
import EmployeeForm from './EmployeeForm';
import { Plus, Edit2, Trash2 } from 'lucide-react';

const EmployeeList = () => {
    const employees = useSelector((state) => state.employees.items);
    const dispatch = useDispatch();

    const [isModalOpen, setIsModalOpen] = useState(false);
    const [editingEmployee, setEditingEmployee] = useState(null);

    const handleOpenModal = (employee = null) => {
        setEditingEmployee(employee);
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setEditingEmployee(null);
        setIsModalOpen(false);
    };

    const handleSubmit = (data) => {
        if (editingEmployee) {
            dispatch(updateEmployee({ ...data, id: editingEmployee.id }));
        } else {
            dispatch(addEmployee({ ...data, id: uuidv4() }));
        }
        handleCloseModal();
    };

    const handleDelete = (id) => {
        if (window.confirm('Are you sure you want to delete this employee?')) {
            dispatch(deleteEmployee(id));
        }
    };

    const existingEmails = employees.map(emp => emp.email);

    return (
        <div className="container-fluid">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 pb-3 border-bottom gap-3 w-100">
                <h1 className="h3 mb-0 text-dark fw-bold">Employees</h1>
                <Button onClick={() => handleOpenModal()} variant="primary" className="d-flex align-items-center justify-content-center gap-2 align-self-stretch align-self-sm-auto">
                    <Plus size={18} /> Add Employee
                </Button>
            </div>

            <div className="row g-4">
                {employees.length === 0 ? (
                    <div className="col-12">
                        <div className="bg-white border rounded p-5 text-center text-muted border-dashed shadow-sm">
                            <p className="mb-0 fs-5">No employees found. Add one to get started.</p>
                        </div>
                    </div>
                ) : (
                    employees.map((emp) => (
                        <div key={emp.id} className="col-12 col-md-6 col-lg-4 col-xl-3">
                            <div className="card h-100 shadow-sm border-0">
                                <div className="card-body d-flex flex-column">
                                    <div className="d-flex justify-content-between align-items-start mb-3">
                                        <img src={emp.image} alt={emp.name} className="rounded-circle border border-2 border-primary object-fit-cover shadow-sm" style={{ width: '64px', height: '64px' }} />
                                        <div className="d-flex gap-1">
                                            <button className="btn btn-sm btn-light text-secondary rounded p-1" onClick={() => handleOpenModal(emp)} title="Edit">
                                                <Edit2 size={16} />
                                            </button>
                                            <button className="btn btn-sm btn-light text-danger rounded p-1" onClick={() => handleDelete(emp.id)} title="Delete">
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </div>
                                    <h5 className="card-title fw-bold mb-1">{emp.name}</h5>
                                    <h6 className="card-subtitle text-primary mb-3 fw-semibold">{emp.position}</h6>
                                    <p className="card-text text-muted small mt-auto mb-0">{emp.email}</p>
                                </div>
                            </div>
                        </div>
                    ))
                )}
            </div>

            <Modal
                isOpen={isModalOpen}
                onClose={handleCloseModal}
                title={editingEmployee ? 'Edit Employee' : 'Add Employee'}
            >
                <EmployeeForm
                    initialData={editingEmployee}
                    onSubmit={handleSubmit}
                    onCancel={handleCloseModal}
                    existingEmails={existingEmails}
                />
            </Modal>
        </div>
    );
};

export default EmployeeList;
