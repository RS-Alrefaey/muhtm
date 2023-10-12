import React from 'react'
import NavSidebar from './NavSidebar'
import HistoryRecord from './HistoryRecord'

function HistoryPage() {
    return (
        <>
            <div className="flex items-center justify-center min-h-screen">
                <div className="dash-bg flex items-center justify-center p-10" >

                    <div className="content-bg w-3/4 flex flex-col p-5">
                    <HistoryRecord date='التاريخ' category='التصنيف' percentage='نسبة رضا العملاء' />
                    <HistoryRecord date='13/8/52' category='الكترونيات' percentage='96%' details='لرؤية التفاصيل' />
                    </div>


                    <div className="w-1/4  border-white m-5 border-l-2 h-full ">
                        <NavSidebar />
                    </div>

                </div>
            </div >


        </>
    )
}

export default HistoryPage