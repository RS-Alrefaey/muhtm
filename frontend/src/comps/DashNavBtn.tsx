import React from 'react';

export type DashNavProps = {
    icon: React.ReactNode;
    title: string; 
    size: 'sm' | 'md' | 'lg' | 'xl'; 
}

function DashNav({ icon, title }: DashNavProps) {
    return (
        <div className="group flex justify-between space-x-2 p-2 rounded transition text-blue-950 hover:bg-blue-950 hover:text-white cursor-pointer font-cursive">
            <p className='w-full text-right group-hover:'>{title}</p>
            <div>{icon}</div>
        </div>
    );
}

export default DashNav;
