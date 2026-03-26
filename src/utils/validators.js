import * as yup from 'yup';

export const employeeSchema = yup.object().shape({
    name: yup.string().required('Name is required'),
    position: yup.string().required('Position is required'),
    email: yup.string().email('Invalid email').required('Email is required'),
    // We'll handle image validation separately or manually in the component since file inputs are tricky with pure string schemas in yup
});

export const projectSchema = yup.object().shape({
    title: yup.string().required('Project Title is required'),
    description: yup.string().required('Project Description is required'),
    startDate: yup.string().required('Start Date is required'),
    endDate: yup.string().required('End Date is required')
        .test('is-greater', 'End Date must be after Start Date', function (value) {
            const { startDate } = this.parent;
            if (!startDate || !value) return true;
            return new Date(value) > new Date(startDate);
        }),
});

export const taskSchema = yup.object().shape({
    title: yup.string().required('Task Title is required'),
    description: yup.string().required('Task Description is required'),
    projectId: yup.string().required('Project is required'),
    assignedEmployeeId: yup.string().required('Assigned Employee is required'),
    eta: yup.string().required('ETA is required'),
});
