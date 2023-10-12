import React from 'react'
import NavSidebar from './NavSidebar'
import formImage from './formsImage.jpg';
import uploadImage from './uploadIcon.png';
import UploadBtn from './UploadBtn';


function MainDashPage() {
    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <div className="dash-bg flex items-center justify-center p-10" >

                    <div className="content-bg w-3/4 flex flex-col p-5">

                        <div className="flex-grow max-w-min">
                            {/* charts */}
                        </div>

                        <div className="flex justify-center mt-4 items-center">

                            <button className="button-secondary border-solid">تصدير نتيجة التحليل</button>

                            {/* <button className="button-secondary border-dashed flex items-center">
                                <img src={uploadImage} alt="Icon" className="w-8 h-8 flex mr-2" />
                                تحليل جديد
                            </button> */}

                            <div>
                                <UploadBtn/>
                            </div>


                        </div>

                    </div>


                    <div className="w-1/4  border-white m-5 border-l-2 h-full ">
                        <NavSidebar />
                    </div>

                </div>
            </div >
        </>
    )
}

export default MainDashPage