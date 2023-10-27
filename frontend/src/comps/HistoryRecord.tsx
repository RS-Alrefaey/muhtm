import React from 'react'



export type HistoryRecord = {
    date: string;
    percentage: string;
    category: string;
    details?: string;
};


function HistoryRecord({ date, percentage, category, details }: HistoryRecord) {
    return (
        <div className="flex justify-center gap-52 w-full p-4 border-b items-start">
            <div className="text-right">
                <span className="block">{category}</span>
            </div>
            <div className="text-right">
                <span className="block">{percentage}</span>
            </div>
            <div className="text-right">
                <span className="block">{date}</span>
            </div>
            <div className="text-right">
                <span className="block">{details}</span>
            </div>
        </div>
    );
}

export default HistoryRecord