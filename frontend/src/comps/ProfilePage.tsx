import React, { useState, useEffect } from 'react';
import NavSidebar from './NavSidebar'
import InputField from './InputField'
import agent, { UserType } from '../API/Agent';
import editIcon from './editIcon.png'



function ProfilePage() {

    const [userData, setUserData] = useState<UserType | null>(null);
    const [isEditMode, setIsEditMode] = useState(false);


    useEffect(() => {
        async function fetchUserData() {
            try {
                const data = await agent.User.profile(); // assuming your axios call is set up like this
                setUserData(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }

        fetchUserData();
    }, []);


    return (
        <div className="flex items-center justify-center min-h-screen">
        <div className="dash-bg flex items-center justify-center" >

            <div className="content-bg w-3/4 flex flex-col p-5 m-5 mr-20">
                    <div className='flex flex-col justify-center items-center m-16'>

                        <div className='flex mb-4'>
                            <InputField placeholder={'الاسم الأول'} readOnly={!isEditMode} value={userData ? userData.first_name : ""} />
                            <button className="relative bottom-16 left-60" onClick={() => setIsEditMode(!isEditMode)}><img src={editIcon}></img></button>

                        </div>

                        <div>
                            <InputField placeholder={'اسم  المستخدم'} readOnly={!isEditMode} value={userData ? userData.username : ""} />
                            <InputField placeholder={'رقم الجوال'} readOnly={!isEditMode} value={userData ? userData.phone_number : ""} />
                            <InputField placeholder={'البريد الإلكتروني '} readOnly={!isEditMode} value={userData ? userData.email : ""} />
                            <InputField placeholder={'رابط المتجر الإلكتروني '} type='url' readOnly={!isEditMode} value={userData ? userData.store_link : ""} />
                            <InputField placeholder={'كلمة المرور'} type='password' readOnly={!isEditMode} value={userData ? userData.password : ""} />
                        </div>
                        <div className='flex mt-5 space-x-2'>
                            <button className="button-prim ">إلغاء</button>
                            <button className="button-prim">حفظ</button>
                        </div>
                    </div>
                </div>


                <div className="border-white border-l-2 h-full flex items-center relative bottom-10">
                    <NavSidebar />
                </div>

            </div>
        </div >
    )
}

export default ProfilePage