import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import {
    SortableContext,
    verticalListSortingStrategy
} from '@dnd-kit/sortable';
import BoardTaskCard from './BoardTaskCard';

const BoardColumn = ({ columnId, title, tasks, colorHex }) => {
    const { setNodeRef, isOver } = useDroppable({
        id: columnId,
        data: { type: 'Column', status: columnId }
    });

    return (
        <div
            className={`card border-0 shadow-sm flex-shrink-0 d-flex flex-column bg-light ${isOver ? 'bg-secondary bg-opacity-25' : ''}`}
            style={{ width: '320px', maxHeight: '100%', transition: 'background-color 0.2s' }}
        >
            <div
                className="card-header bg-white border-bottom d-flex justify-content-between align-items-center py-3"
                style={{ borderTop: `4px solid ${colorHex}`, borderTopLeftRadius: '0.375rem', borderTopRightRadius: '0.375rem' }}
            >
                <h6 className="mb-0 fw-bold">{title}</h6>
                <span className="badge bg-secondary rounded-pill px-2">{tasks.length}</span>
            </div>

            <div ref={setNodeRef} className="card-body d-flex flex-column overflow-auto p-3" style={{ minHeight: '150px' }}>
                <SortableContext
                    items={tasks.map(t => t.id)}
                    strategy={verticalListSortingStrategy}
                >
                    {tasks.map(task => (
                        <BoardTaskCard key={task.id} task={task} />
                    ))}
                </SortableContext>
                {tasks.length === 0 && (
                    <div className="d-flex align-items-center justify-content-center border border-dashed text-muted rounded p-3 h-100 bg-white" style={{ borderStyle: 'dashed' }}>
                        <small>Drop tasks here</small>
                    </div>
                )}
            </div>
        </div>
    );
};

export default BoardColumn;
