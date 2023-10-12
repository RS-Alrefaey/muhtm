import React from 'react'
import muhtmLogo from './muhtmLogo.svg'
import profileIcon from './profileIcon.png'

import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';


function MainNavBar() {

    const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
    const navigate = useNavigate();

    const handleProfileClick = () => {
        if (isAuthenticated) {
            navigate("/dashboard");
        } else {
            navigate("/login");
        }
    };

    return (

        <div className="bg-white rounded-3xl p-4 m-5 w-3/4 h-[100px] flex justify-between items-center absolute" >
            <div className="flex items-center" onClick={handleProfileClick} >
                <Link to="/"> <img src={profileIcon} alt="Website Logo" className="h-auto w-[40px]" /></Link>
            </div>
            <div className="flex items-center justify-start space-x-4">
                <Link to="/contact" className="text-blue-950 text-lg hover:text-blue-800">تواصل معنا</Link>
                <Link to="/about" className="text-blue-950 text-lg hover:text-blue-800">عن مهتم</Link>
                <Link to="/" className='w-fit'> <img src={muhtmLogo} alt="Website Logo" className="h-auto w-[140px]" /></Link>

            </div>
        </div>
    )
}

export default MainNavBar