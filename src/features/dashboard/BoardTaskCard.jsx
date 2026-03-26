import React from 'react';
import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Clock, User, FileImage } from 'lucide-react';
import { format } from 'date-fns';
import { useSelector } from 'react-redux';

const BoardTaskCard = ({ task }) => {
    const employees = useSelector(state => state.employees.items);

    const {
        attributes,
        listeners,
        setNodeRef,
        transform,
        transition,
        isDragging,
    } = useSortable({ id: task.id, data: { status: task.status } });

    const style = {
        transform: CSS.Transform.toString(transform),
        transition,
        opacity: isDragging ? 0.5 : 1,
        zIndex: isDragging ? 999 : 1,
        cursor: isDragging ? 'grabbing' : 'grab',
    };

    const getEmployeeName = (id) => employees.find(e => e.id === id)?.name || 'Unassigned';

    return (
        <div
            ref={setNodeRef}
            style={style}
            {...attributes}
            {...listeners}
            className={`card shadow-sm mb-3 border ${isDragging ? 'border-primary shadow' : 'border-light'}`}
        >
            <div className="card-body p-3 d-flex flex-column gap-2">
                <h6 className="card-title fw-semibold mb-0 text-dark lh-sm">{task.title}</h6>

                {task.referenceImage && (
                    <div className="d-inline-flex align-items-center gap-1 text-primary bg-primary bg-opacity-10 px-2 py-1 rounded w-auto" style={{ fontSize: '0.75rem', width: 'max-content' }}>
                        <FileImage size={12} /> View Image
                    </div>
                )}

                <div className="d-flex justify-content-between align-items-center mt-2">
                    <div className="d-flex align-items-center gap-1 text-muted" style={{ fontSize: '0.75rem' }}>
                        <User size={12} />
                        <span className="text-truncate" style={{ maxWidth: '100px' }}>{getEmployeeName(task.assignedEmployeeId)}</span>
                    </div>
                    <div className="d-flex align-items-center gap-1 text-muted" style={{ fontSize: '0.75rem' }}>
                        <Clock size={12} />
                        <span>{task.eta ? format(new Date(task.eta), 'MMM dd HH:mm') : 'No ETA'}</span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BoardTaskCard;
