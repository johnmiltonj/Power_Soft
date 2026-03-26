import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { projectSchema } from '../../utils/validators';
import { useSelector } from 'react-redux';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const ProjectForm = ({ initialData, onSubmit, onCancel }) => {
    const employees = useSelector((state) => state.employees.items);
    const [logoPreview, setLogoPreview] = useState(initialData?.logo || null);
    const [logoError, setLogoError] = useState('');

    const { register, handleSubmit, formState: { errors } } = useForm({
        resolver: yupResolver(projectSchema),
        defaultValues: initialData || {
            title: '',
            description: '',
            startDate: '',
            endDate: '',
            assignedEmployeeIds: [],
        }
    });

    const handleLogoChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setLogoPreview(reader.result);
                setLogoError('');
            };
            reader.readAsDataURL(file);
        }
    };

    const submitHandler = (data) => {
        if (!logoPreview) {
            setLogoError('Project Logo is required');
            return;
        }
        onSubmit({ ...data, logo: logoPreview });
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)} className="d-flex flex-column gap-3">
            <Input
                label="Project Title"
                {...register('title')}
                error={errors.title?.message}
            />
            <div className="mb-3">
                <label className="form-label fw-bold" htmlFor="description">Project Description</label>
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
                    <Input
                        label="Start Date"
                        type="date"
                        {...register('startDate')}
                        error={errors.startDate?.message}
                    />
                </div>
                <div className="col-12 col-md-6">
                    <Input
                        label="End Date"
                        type="date"
                        {...register('endDate')}
                        error={errors.endDate?.message}
                    />
                </div>
            </div>

            <div className="mb-3">
                <label className="form-label fw-bold" htmlFor="assignedEmployeeIds">Assign Employees</label>
                <select
                    id="assignedEmployeeIds"
                    multiple
                    className="form-select"
                    style={{ height: '120px' }}
                    {...register('assignedEmployeeIds')}
                >
                    {employees.map(emp => (
                        <option key={emp.id} value={emp.id} className="p-2 border-bottom">
                            {emp.name} ({emp.position})
                        </option>
                    ))}
                </select>
                <div className="form-text">Hold Ctrl/Cmd to select multiple</div>
            </div>

            <div className="mb-3">
                <label className="form-label fw-bold">Project Logo</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleLogoChange}
                    className={`form-control ${logoError ? 'is-invalid' : ''}`}
                />
                {logoError && <div className="invalid-feedback">{logoError}</div>}
                {logoPreview && (
                    <div className="mt-2 text-center p-2 bg-light border rounded" style={{ width: 'max-content' }}>
                        <img
                            src={logoPreview}
                            alt="Logo Preview"
                            className="object-fit-contain"
                            style={{ width: '80px', height: '80px' }}
                        />
                    </div>
                )}
            </div>

            <div className="d-flex justify-content-end gap-2 mt-2">
                <Button type="button" variant="light" onClick={onCancel}>Cancel</Button>
                <Button type="submit" variant="primary">
                    {initialData ? 'Update' : 'Create'} Project
                </Button>
            </div>
        </form>
    );
};

export default ProjectForm;
