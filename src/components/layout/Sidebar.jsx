import React from 'react';
import { NavLink } from 'react-router-dom';
import { LayoutDashboard, Users, Briefcase, CheckSquare } from 'lucide-react';

export const navItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <LayoutDashboard size={20} />, path: '/dashboard' },
    { id: 'employees', label: 'Employees', icon: <Users size={20} />, path: '/employees' },
    { id: 'projects', label: 'Projects', icon: <Briefcase size={20} />, path: '/projects' },
    { id: 'tasks', label: 'Tasks', icon: <CheckSquare size={20} />, path: '/tasks' },
];

const Sidebar = () => {
    return (
        <aside className="bg-dark text-white flex-shrink-0 d-none d-md-flex flex-column h-100 shadow" style={{ width: '250px', zIndex: 1040 }}>
            <div className="d-flex align-items-center px-4 border-bottom border-secondary flex-shrink-0" style={{ height: '72px' }}>
                <div className="d-flex align-items-center gap-2">
                    <div className="bg-primary text-white rounded d-flex align-items-center justify-content-center fw-bold shadow-sm" style={{ width: '32px', height: '32px' }}>
                        P
                    </div>
                    <span className="fw-bold fs-5 mb-0 tracking-tight">ProManage</span>
                </div>
            </div>
            <nav className="nav nav-pills flex-column px-3 pt-4 gap-2 flex-grow-1 overflow-auto pb-4">
                {navItems.map((item) => (
                    <NavLink
                        key={item.id}
                        to={item.path}
                        className={({ isActive }) => `nav-link text-white d-flex align-items-center gap-3 py-2 px-3 rounded ${isActive ? 'active shadow-sm' : ''}`}
                        style={{ fontWeight: '500', transition: 'all 0.2s' }}
                    >
                        {item.icon}
                        <span>{item.label}</span>
                    </NavLink>
                ))}
            </nav>
        </aside>
    );
};

export default Sidebar;
