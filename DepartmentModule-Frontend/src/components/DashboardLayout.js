import React from 'react';

const DashboardLayout = ({ children }) => {
    return (
        <div className="flex h-screen bg-gray-50 overflow-hidden font-sans">
            
            {/* --- EXACT SIDEBAR --- */}
            <div className="w-64 bg-[#0F172A] flex flex-col fixed h-full z-20 transition-all">
                
                {/* 1. Header & Logo */}
                <div className="h-16 flex items-center justify-between px-5 py-8 border-b border-gray-800">
                    <div className="flex items-center">
                        <div className="w-8 h-8 bg-emerald-500 rounded flex items-center justify-center mr-3 shadow-sm">
                            <svg className="w-5 h-5 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg>
                        </div>
                        <div>
                            <h1 className="font-bold text-[15px] text-white leading-tight">Nexus HR</h1>
                            <p className="text-[12px] text-gray-400">HR Manager</p>
                        </div>
                    </div>
                    <span className="text-gray-500 text-xs cursor-pointer hover:text-white">❮</span>
                </div>

                {/* 2. Navigation Links */}
                <nav className="flex-1 py-4 flex flex-col space-y-1 overflow-y-auto overflow-x-hidden">
                    <NavItem icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"></path></svg>} label="Dashboard" />
                    <NavItem icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z"></path></svg>} label="Employees" />
                    <NavItem icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>} label="Attendance" />
                    <NavItem icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"></path></svg>} label="Leave Management" />
                    <NavItem icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18 9v3m0 0v3m0-3h3m-3 0h-3m-2-5a4 4 0 11-8 0 4 4 0 018 0zM3 20a6 6 0 0112 0v1H3v-1z"></path></svg>} label="Recruitment" />
                    
                    {/* ACTIVE STATE: Departments */}
                    <div className="flex items-center px-6 py-3 bg-[#1E293B] text-[#3B82F6] cursor-pointer border-l-4 border-[#3B82F6]">
                        <span className="mr-4"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4"></path></svg></span>
                        <span className="font-medium text-[14px]">Departments</span>
                    </div>

                    <NavItem icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6"></path></svg>} label="Performance" />
                    <NavItem icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path></svg>} label="Reports" />
                    
                    <div className="my-2 border-t border-gray-800 mx-4"></div>

                    {/* Chat with notification badge */}
                    <NavItem 
                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z"></path></svg>} 
                        label="Chat" 
                        badge="" 
                    />
                    
                    {/* Notifications with notification badge */}
                    <NavItem 
                        icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>} 
                        label="Notifications" 
                        badge="" 
                    />
                    
                    <NavItem icon={<svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"></path><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path></svg>} label="Settings" />
                </nav>

                {/* 3. Bottom Profile Area */}
                <div className="p-5 border-t border-gray-800 hover:bg-[#1E293B] cursor-pointer transition-colors flex justify-between items-center">
                    <div className="flex items-center">
                        <div className="w-9 h-9 rounded-full bg-blue-600 flex items-center justify-center text-sm font-bold text-white mr-3">
                            SM
                        </div>
                        <div className="flex-1 min-w-0 pr-2">
                            <p className="text-[14px] font-medium text-white truncate">Sarah Mitchell</p>
                            <p className="text-[12px] text-gray-400 truncate">s.mitchell@acme.com</p>
                        </div>
                    </div>
                    {/* Logout Icon */}
                    <svg className="w-5 h-5 text-gray-500 hover:text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"></path>
                    </svg>
                </div>
            </div>

            {/* --- MAIN CONTENT AREA --- */}
            <div className="flex-1 ml-64 flex flex-col h-full relative">
                
                {/* Top Navigation Bar */}
                <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
                    <div className="flex flex-col">
                        <div className="flex items-center space-x-4">
                            <h2 className="font-bold text-lg text-gray-800">Departments</h2>
                            {/* Search bar placeholder as seen in Top Nav */}
                            <div className="relative hidden md:block">
                                <span className="absolute inset-y-0 left-0 flex items-center pl-3 text-gray-400 text-sm">🔍</span>
                                <input type="text" placeholder="Search..." className="pl-9 pr-4 py-1.5 border border-gray-200 rounded-md bg-gray-50 text-sm focus:outline-none focus:ring-1 focus:ring-blue-500 w-48" />
                            </div>
                        </div>
                    </div>

                    <div className="flex items-center space-x-6">
                        <div className="relative cursor-pointer">
                            <svg className="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9"></path></svg>
                        </div>
                        <button className="flex items-center space-x-2 border border-gray-200 px-3 py-1.5 rounded-full hover:bg-gray-50 text-sm font-medium text-gray-600">
                            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path></svg>
                            <span>Switch Role</span>
                        </button>
                        <div className="flex items-center space-x-2 cursor-pointer">
                            <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center text-xs font-bold text-white">SM</div>
                            <div className="hidden md:block">
                                <p className="text-sm font-bold text-gray-800 leading-none">Sarah M.</p>
                                <p className="text-[11px] text-gray-500">HR Manager</p>
                            </div>
                            <span className="text-gray-400 text-xs">▼</span>
                        </div>
                    </div>
                </header>

                <div className="px-8 py-4 bg-white border-b border-gray-100 flex text-sm text-gray-500 space-x-2">
                    <span className="cursor-pointer hover:text-gray-800 flex items-center"><svg className="w-3.5 h-3.5 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"></path></svg> Home</span>
                    <span>›</span>
                    <span className="cursor-pointer hover:text-gray-800">HR</span>
                    <span>›</span>
                    <span className="font-medium text-gray-900">Departments</span>
                </div>

                {/* The dynamic page content gets injected here */}
                <main className="flex-1 overflow-y-auto bg-gray-50">
                    {children}
                </main>

            </div>
        </div>
    );
};

// Helper component for standard inactive sidebar links
const NavItem = ({ icon, label, badge }) => (
    <div className="flex items-center justify-between px-6 py-2.5 text-[#94A3B8] hover:text-white hover:bg-[#1E293B] cursor-pointer transition-colors group">
        <div className="flex items-center">
            <span className="mr-4 text-gray-400 group-hover:text-white transition-colors">{icon}</span>
            <span className="font-medium text-[14px]">{label}</span>
        </div>
        {/* Render notification badge if provided */}
        {badge && (
            <span className="bg-[#2563EB] text-white text-[10px] font-bold px-1.5 py-0.5 rounded-full min-w-[20px] text-center">
                {badge}
            </span>
        )}
    </div>
);

export default DashboardLayout;