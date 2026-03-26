import React from 'react';
import { Outlet, NavLink } from 'react-router-dom';
import Sidebar, { navItems } from './Sidebar';

const Layout = () => {
    return (
        <div className="d-flex flex-column flex-md-row vh-100 vw-100 overflow-hidden bg-light">

            {/* Desktop Sidebar (hidden on mobile) */}
            <Sidebar />

            {/* Main Content Area */}
            <main className="flex-grow-1 d-flex flex-column h-100 overflow-hidden position-relative pb-5 pb-md-0">

                {/* Mobile Top Header (hidden on desktop) */}
                <div className="d-md-none bg-dark text-white border-bottom border-dark shadow-sm d-flex align-items-center px-3 flex-shrink-0 justify-content-center" style={{ height: '60px', zIndex: 50 }}>
                    <div className="d-flex align-items-center gap-2">
                        <div className="bg-primary text-white rounded d-flex align-items-center justify-content-center fw-bold" style={{ width: '28px', height: '28px' }}>
                            P
                        </div>
                        <span className="fw-bold fs-5 mb-0 tracking-tight">ProManage</span>
                    </div>
                </div>

                {/* Desktop Top Header (hidden on mobile) */}
                <div className="d-none d-md-flex bg-white border-bottom shadow-sm align-items-center px-4 flex-shrink-0" style={{ height: '72px', zIndex: 50 }}>
                    {/* Optional: Add search bar, profile icon, or breadcrumbs here */}
                </div>

                {/* Scrollable Content */}
                <div className="flex-grow-1 overflow-auto p-3 p-md-4">
                    <Outlet />
                </div>

            </main>

            {/* Mobile Bottom Navigation (hidden on desktop) */}
            <nav className="d-md-none bg-white border-top shadow-lg position-fixed bottom-0 w-100 d-flex justify-content-around align-items-center pb-safe" style={{ height: '65px', zIndex: 1040 }}>
                {navItems.map((item) => (
                    <NavLink
                        key={item.id}
                        to={item.path}
                        className={({ isActive }) => `d-flex flex-column align-items-center justify-content-center text-decoration-none w-100 h-100 ${isActive ? 'text-primary' : 'text-secondary'}`}
                        style={{ transition: 'color 0.2s', padding: '0.5rem' }}
                    >
                        {React.cloneElement(item.icon, { size: 22, className: "mb-1" })}
                        <span style={{ fontSize: '0.65rem', fontWeight: '600' }}>{item.label}</span>
                    </NavLink>
                ))}
            </nav>

        </div>
    );
};

export default Layout;
