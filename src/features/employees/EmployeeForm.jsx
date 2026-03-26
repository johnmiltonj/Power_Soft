import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { employeeSchema } from '../../utils/validators';
import Input from '../../components/common/Input';
import Button from '../../components/common/Button';

const EmployeeForm = ({ initialData, onSubmit, onCancel, existingEmails = [] }) => {
    const [imagePreview, setImagePreview] = useState(initialData?.image || null);
    const [imageError, setImageError] = useState('');

    const { register, handleSubmit, formState: { errors }, setError } = useForm({
        resolver: yupResolver(employeeSchema),
        defaultValues: initialData || {
            name: '',
            position: '',
            email: '',
        }
    });

    const handleImageChange = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                setImagePreview(reader.result);
                setImageError('');
            };
            reader.readAsDataURL(file);
        }
    };

    const submitHandler = (data) => {
        if (!imagePreview) {
            setImageError('Profile Image is required');
            return;
        }

        const isEmailTaken = existingEmails.some(
            (email) => email === data.email && email !== initialData?.email
        );

        if (isEmailTaken) {
            setError('email', { type: 'manual', message: 'Email must be unique' });
            return;
        }

        onSubmit({ ...data, image: imagePreview });
    };

    return (
        <form onSubmit={handleSubmit(submitHandler)} className="d-flex flex-column gap-3">
            <Input
                label="Name"
                {...register('name')}
                error={errors.name?.message}
            />
            <Input
                label="Position"
                {...register('position')}
                error={errors.position?.message}
            />
            <Input
                label="Official Email ID"
                type="email"
                {...register('email')}
                error={errors.email?.message}
            />

            <div className="mb-3">
                <label className="form-label fw-bold">Profile Image</label>
                <input
                    type="file"
                    accept="image/*"
                    onChange={handleImageChange}
                    className={`form-control ${imageError ? 'is-invalid' : ''}`}
                />
                {imageError && <div className="invalid-feedback">{imageError}</div>}
                {imagePreview && (
                    <div className="mt-2">
                        <img
                            src={imagePreview}
                            alt="Preview"
                            className="rounded-circle object-fit-cover shadow-sm border border-secondary"
                            style={{ width: '80px', height: '80px' }}
                        />
                    </div>
                )}
            </div>

            <div className="d-flex justify-content-end gap-2 mt-2">
                <Button type="button" variant="light" onClick={onCancel}>Cancel</Button>
                <Button type="submit" variant="primary">
                    {initialData ? 'Update' : 'Create'} Employee
                </Button>
            </div>
        </form>
    );
};

export default EmployeeForm;
