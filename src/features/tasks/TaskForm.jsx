import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { taskSchema } from '../../utils/validators';
import { useSelector } from 'react-redux';
import Input from '../../components/common/Input';
import Select from '../../components/common/Select';
import Button from '../../components/common/Button';

const TaskForm = ({ initialData, onSubmit, onCancel }) => {
    const projects = useSelector((state) => state.projects.items);
    const employees = useSelector((state) => state.employees.items);
    const [imagePreview, setImagePreview] = useState(initialData?.referenceImage || null);

    const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm({
        resolver: yupResolver(taskSchema),
        defaultValues: initialData || {
            title: '',
            description: '',
            projectId: '',
            assignedEmployeeId: '',
            eta: '',
            status: 'Need to Do',
        }
    });

    const selectedProjectId = watch('projectId');

    useEffect(() => {
        if (!initialData || selectedProjectId !== initialData.projectId) {
            setValue('assignedEmployeeId', '');
        }
    }, [selectedProjectId, initialData, setValue]);

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => setImagePreview(reader.result);
            reader.readAsDataURL(file);
        }
    };

    const submitHandler = (data) => {
        onSubmit({ ...data, referenceImage: imagePreview });
    };

    const selectedProject = projects.find(p => p.id === selectedProjectId);
    const allowedEmployees = selectedProject
        ? employees.filter(emp => selectedProject.assignedEmployeeIds?.includes(emp.id))
        : [];

    const projectOptions = projects.map(p => ({ label: p.title, value: p.id }));
    const employeeOptions = allowedEmployees.map(e => ({ label: `${e.name} (${e.position})`, value: e.id }));

    return (
        <form onSubmit={handleSubmit(submitHandler)} className="d-flex flex-column gap-3">
            <Input label="Task Title" {...register('title')} error={errors.title?.message} />

            <div className="mb-3">
                <label className="form-label fw-bold" htmlFor="description">Task Description</label>
                <textarea
                    id="description"
                    className={`form-control ${errors.description ? 'is-invalid' : ''}`}
                    rows={3}
                    {...register('description')}
                />
                {errors.description && <div className="invalid-feedback">{errors.description.message}</div>}
            </div>

            <div className="row g-3">
                <div className="col-12 col-md-6">
                    <Select
                        label="Project"
                        options={projectOptions}
                        {...register('projectId')}
                        error={errors.projectId?.message}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <Select
                        label="Assigned Employee"
                        options={employeeOptions}
                        {...register('assignedEmployeeId')}
                        error={errors.assignedEmployeeId?.message}
                        disabled={!selectedProjectId}
                    />
                </div>
            </div>

            <div className="row g-3">
                <div className="col-12">
                    <Input label="ETA (Date & Time)" type="datetime-local" {...register('eta')} error={errors.eta?.message} />
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label fw-bold">Reference Image (Optional)</label>
                <input type="file" className="form-control" accept="image/*" onChange={handleImageChange} />
                {imagePreview && (
                    <div className="mt-2 text-center p-2 bg-light border rounded" style={{ width: 'max-content' }}>
                        <img
                            src={imagePreview}
                            alt="Reference Preview"
                            className="object-fit-cover rounded"
                            style={{ width: '100px', height: '100px' }}
                        />
                    </div>
                )}
            </div>

            <div className="d-flex justify-content-end gap-2 mt-2">
                <Button type="button" variant="light" onClick={onCancel}>Cancel</Button>
                <Button type="submit" variant="primary">{initialData ? 'Update' : 'Create'} Task</Button>
            </div>
        </form>
    );
};

export default TaskForm;
