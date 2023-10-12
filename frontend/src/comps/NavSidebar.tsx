import React from 'react'
import DashNav from './DashNavBtn';
import home from './homeIcon.png';
import dash from './dashIcon.png';
import analysisIcon from './analysisIcon.png';
import profileIcon from './profileIcon.png';


import muhtmLogo from './muhtmLogo.svg'

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';



function NavSidebar() {
    return (
        <div className=' flex flex-col justify-center items-center w-auto content-center'>
            {<img src={muhtmLogo} alt="My Custom Icon" className="w-3/4 h-3/4"></img>}
            <div className='space-y-8'>
                <Link to="/" >
                    <DashNav icon={<img src={home} alt="My Custom Icon" className="w-6 h-6" />} title="الصفحة الرئيسية" size='sm' />
                </Link>

                <Link to="/dashboard">
                    <DashNav icon={<img src={dash} alt="My Custom Icon" className="w-6 h-6" />} title="لوحة التحكم" size='sm' />
                </Link>

                <Link to="/history">
                    <DashNav icon={<img src={analysisIcon} alt="My Custom Icon" className="w-6 h-6" />} title="سجل التحليلات" size='sm' />
                </Link>

                <Link to="/profile">
                    <DashNav icon={<img src={profileIcon} alt="My Custom Icon" className="w-6 h-6" />} title="الملف الشخصي" size='sm' />
                </Link>

                {/* لو احطلها بادنق الايكونز تختفي */}
            </div>

        </div>
    )
}

export default NavSidebar