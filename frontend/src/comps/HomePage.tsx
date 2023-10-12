import React, { useEffect, useState } from 'react'
import MainNavBar from './MainNavBar';

import Title from './Title';
import ImageWithFrame from './ImgWithFrame'
import GoalCards from './GoalCards'
import agent from '../API/Agent';

import backgroundImage from './mainBGimage.png';
import GoalImage from './GoalImage.png'
import savetimeIcon from './savetimeIcon.png'
import devIcon from './devIcon.png'
import cxIcon from './cxIcon.png'
import controlPanelIcon from './controlPanelIcon.png'
import autoSearchIcon from './autoSearchIcon.png'
import chartsIcon from './chartsIcon.png'



function HomePage() {


    return (

        // page container
        <div className='w-full h-full flex flex-col justify-center font-cursive'>


            {/* main banner container */}
            <div className="bg-center bg-no-repeat bg-cover h-[500px] w-full flex justify-center relative"
                style={{ backgroundImage: `url(${backgroundImage})` }}>

                <MainNavBar />

                <div className='w-[500px] h-[300px] bg-white bg-opacity-40 absolute top-1/3 left-1/2 rounded-3xl p-10 flex justify-end text-right'>
                    <Title text={"مهتم، لتحريك أعمالك إلى الأمام"} size="xl" desc='.نحو تجارة الكترونية أشمل، أفضل، تهتم أكثر' />
                </div>


            </div>

            {/* muhtm goals container */}
            <div className='flex flex-col m-36 justify-center'>
                {/* sand clock and the general goals container */}
                <div className='flex justify-evenly  items-center'>
                    <div className='w-1/2 mr-16 text-right'>
                        <Title
                            text={"أهداف مهتم"}
                            size="xl"
                            desc={`نعلم أن إدارة تجارتك الإلكترونية وخصوصاً تحليل البيانات الخاصة
                                    بردود العملاء والاستفادة منها قد يكون مكلفاً من الناحية المادية في حال الاستعانة
                                    بمحلل مختص أو قد يستغرق الكثير من وقتك الثمين إذا أردت القيام بالتحليل شخصياً.
                                    لذلك “مهتم” يهتم بمساعدتك من هذه الزاوية القيمة لتوفير وقتك وجهدك`}
                        />
                    </div>
                    <ImageWithFrame imageUrl={GoalImage} />
                </div>
                {/* muhtm goals cards container */}
                <div className='flex mt-20 justify-evenly space-x-2'>
                    <GoalCards imageUrl={devIcon} title=' التطوير المستمر' description='التطوير المستمر يعد من أهم المقومات لبقاء أي مشروع في سوق العمل وضمان المنافسة' color='blue-950' />
                    <GoalCards imageUrl={cxIcon} title='تحسين تجربة العميل ' description='يعد العميل ركيزة أساسية في تطور ونجاح أي مشروع لذلك نسعى في المساعدة لتحسين تجربة العميل' color='blue-950' />
                    <GoalCards imageUrl={savetimeIcon} title='توفير الوقت' description='عن طريق أتمتة عملية تحليل أراء العملاء وتقديم بعض الدلالات عن مدى رضا العملاء' color='blue-950' />
                </div>
            </div>

            {/* muhtm services container */}
            <div className='flex flex-col justify-center bg-blue-950 w-full items-center ' >
                
                <div className='w-full'>
                <h1 className='text-center text-white mt-10 text-5xl font-bold'> خدماتنا </h1>
                </div>

                <div className='flex mt-16 mb-16 justify-around w-full'>
                    <GoalCards imageUrl={chartsIcon} title='رسوم بيانية' description={`يتم عرض النتائج في رسوم بيانية \n ويمكن مقارنتها بالسجلات السابقة `} color="#FFFFFF" />
                    <GoalCards imageUrl={autoSearchIcon} title='أتمتة تحليل التعليقات' description={`لا داعي لتخصيص المزيد من وقتك الثمين \n لأجل تحليل اراء عملاءك`} color="#FFFFFF" />
                    <GoalCards imageUrl={controlPanelIcon} title='واجهة تحكم سلسة' description={`لإدارة عملية التحليل بشكل سلس، عملي وبسيط`} color="#FFFFFF" />
                </div>

            </div>

            {/* promote buttons container */}
            <div className='flex flex-col m-20 justify-center'>
                <h1 className='text-center text-blue-950 text-2xl font-bold'> هل أنت مستعد لنقل نمو عملك إلى المستوى التالي؟ </h1>

                <div className="flex mt-8 min-w-fit justify-center space-x-5">
                    <button className="button-prim ">تواصل معنا</button>
                    <button className="button-prim">سجل الآن</button>
                </div>

            </div>







        </div>
    )
}

export default HomePage

// const [DashBoardData, setDashBoardData] = useState<DashboardDataType>();
// useEffect(()=>{
//     agent.DashboardAPI.list("1").then((r)=>setDashBoardData(r))

// }, [])
// {`hi, ${DashBoardData?.user.username}`}




// This code is written in JavaScript and it is using React hooks.

// The first line declares two variables, `DashBoardData` and `setDashBoardData`,
// using the `useState` hook. The `useState` hook is a function provided by React
// that allows us to add state to functional components. In this case, `DashBoardData`
// is the state variable and `setDashBoardData` is the function that we can use to
// update the state.

// The second line uses the `useEffect` hook. The `useEffect` hook is another
// function provided by React that allows us to perform side effects in functional
// components. In this case, the side effect is making an API call to fetch some data.

// Inside the `useEffect` hook, we call the `agent.DashboardAPI.list("1")` function,
// which is presumably an API call that returns a promise. We then chain a `then`
// method to the promise, which takes a callback function as an argument. This
// callback function receives the result of the API call and sets the `DashBoardData`
// state variable to the result using the `setDashBoardData` function.

// The second argument to the `useEffect` hook is an empty array `[]`. This tells
// React that the side effect should only be run once, when the component is first
// rendered. This is because the empty array means that there are no dependencies
// for the side effect, so it doesn't need to be re-run if any dependencies change.

// In summary, this code sets up a state variable called `DashBoardData` and a
// function to update that state variable called `setDashBoardData`. It then uses
// the `useEffect` hook to make an API call and update the `DashBoardData` state
// variable with the result of the API call. The side effect is only run once, when
// the component is first rendered.