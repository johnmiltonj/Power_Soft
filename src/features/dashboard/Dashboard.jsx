import React, { useState, useMemo } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {
    DndContext,
    closestCorners,
    KeyboardSensor,
    PointerSensor,
    useSensor,
    useSensors,
    DragOverlay
} from '@dnd-kit/core';
import { sortableKeyboardCoordinates } from '@dnd-kit/sortable';
import { updateTaskStatus } from '../../store/slices/taskSlice';
import BoardColumn from './BoardColumn';
import BoardTaskCard from './BoardTaskCard';
import Select from '../../components/common/Select';

const COLUMNS = [
    { id: 'Need to Do', title: 'Need to Do', colorHex: '#6c757d' },
    { id: 'In Progress', title: 'In Progress', colorHex: '#0d6efd' },
    { id: 'Need for Test', title: 'Need for Test', colorHex: '#ffc107' },
    { id: 'Completed', title: 'Completed', colorHex: '#198754' },
    { id: 'Re-open', title: 'Re-open', colorHex: '#dc3545' },
];

const Dashboard = () => {
    const projects = useSelector((state) => state.projects.items);
    const allTasks = useSelector((state) => state.tasks.items);
    const dispatch = useDispatch();

    const [selectedProjectId, setSelectedProjectId] = useState('all');
    const [activeTaskId, setActiveTaskId] = useState(null);

    const sensors = useSensors(
        useSensor(PointerSensor, { activationConstraint: { distance: 5 } }),
        useSensor(KeyboardSensor, { coordinateGetter: sortableKeyboardCoordinates })
    );

    const projectOptions = [
        { label: 'All Projects', value: 'all' },
        ...projects.map(p => ({ label: p.title, value: p.id }))
    ];

    const filteredTasks = useMemo(() => {
        if (selectedProjectId === 'all') return allTasks;
        return allTasks.filter(t => t.projectId === selectedProjectId);
    }, [allTasks, selectedProjectId]);

    const handleDragStart = (event) => {
        const { active } = event;
        setActiveTaskId(active.id);
    };

    const handleDragEnd = (event) => {
        const { active, over } = event;
        setActiveTaskId(null);
        if (!over) return;

        const activeId = active.id;
        const overId = over.id;

        const isOverColumn = COLUMNS.some(col => col.id === overId);

        let newStatus;
        if (isOverColumn) {
            newStatus = overId;
        } else {
            const overTask = allTasks.find(t => t.id === overId);
            if (overTask) {
                newStatus = overTask.status;
            }
        }

        if (newStatus) {
            const activeTask = allTasks.find(t => t.id === activeId);
            if (activeTask && activeTask.status !== newStatus) {
                dispatch(updateTaskStatus({ id: activeId, status: newStatus }));
            }
        }
    };

    const activeTask = activeTaskId ? allTasks.find(t => t.id === activeTaskId) : null;

    return (
        <div className="container-fluid h-100 d-flex flex-column pb-3">
            <div className="d-flex flex-column flex-sm-row justify-content-between align-items-start align-items-sm-center mb-4 flex-shrink-0 border-bottom pb-3 gap-3 w-100">
                <h1 className="h3 mb-0 text-dark fw-bold">Task Dashboard</h1>
                <div className="align-self-stretch align-self-sm-auto" style={{ minWidth: '200px' }}>
                    <Select
                        options={projectOptions}
                        value={selectedProjectId}
                        onChange={(e) => setSelectedProjectId(e.target.value)}
                        className="mb-0 w-100"
                    />
                </div>
            </div>

            <div className="d-flex gap-4 overflow-auto pb-4 flex-grow-1" style={{ minHeight: 0 }}>
                <DndContext
                    sensors={sensors}
                    collisionDetection={closestCorners}
                    onDragStart={handleDragStart}
                    onDragEnd={handleDragEnd}
                >
                    {COLUMNS.map(col => (
                        <BoardColumn
                            key={col.id}
                            columnId={col.id}
                            title={col.title}
                            colorHex={col.colorHex}
                            tasks={filteredTasks.filter(t => t.status === col.id)}
                        />
                    ))}

                    <DragOverlay>
                        {activeTask ? <BoardTaskCard task={activeTask} /> : null}
                    </DragOverlay>
                </DndContext>
            </div>
        </div>
    );
};

export default Dashboard;
