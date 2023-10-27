import React from 'react'
import MainNavBar from './MainNavBar';
import Title from './Title';
import ImageWithFrame from './ImgWithFrame'
import aboutUsImage from './aboutUsImage.png'


function AboutUsPage() {
    return (
        // page container
        <div className='w-full h-full flex flex-col justify-center font-cursive'>


            <div className="light-blue-bg h-[300px] w-full flex justify-center relative">

                <MainNavBar />

                <div className='w-fit h-fit absolute top-32 left-[1000px]  p-10 flex justify-end '>
                    <Title text={"من نحن ؟"} size="xl" desc='تعرف على المزيد عنا وعن فريقنا' />
                </div>


            </div>

            <div className='flex flex-col m-20 justify-center '>
                <div className='flex justify-evenly items-center'>
                    <div className='w-1/2 mr-16 text-right text-white' >
                        <Title
                            text={"من أين بدأنا؟"}
                            size="xl"
                            desc={`نشأت فكرة “مهتم” من كونه متطلب دراسي لمشروع  التخرج 
                            من جامعة أم القرى، و أتى ليدعم التطور والتحول الرقمي الواقع في 
                            المملكة العربية السعودية والذي تتجه رؤية مملكتنا الحبيبة إليه.`}
                        />
                    </div>
                    <ImageWithFrame imageUrl={aboutUsImage} />
                </div>
            </div>

            <div className='flex flex-col p-10 pr-40 justify-around bg-blue-950 w-full items-end text-white text-right' >
                <Title
                    color='white'
                    text={"لماذا “مهتم”؟"}
                    size="xl"
                    desc={`في مشهد الأعمال التنافسي اليوم  وخصوصاً في ظل التطور الرقمي السريع في المملكة بالإضافة الى القوة الشرائية          ورغبة العديد من رواد الأعمال في بدء مشاريعهم والانطلاق بها ، لم يعد توفير
                             .تجربة عملاء استثنائية أمرًا ممتعًا ، ولكنه ضروري لكل من يسعى  إلى النجاح. 

                             و تعد تعليقات العملاء من أكثر مصادر المعلومات قيمة لتحسين تجربة العملاء      ومع ذلك ، يمكن أن يكون تحليل مراجعات العملاء يدويًا عملية مستهلكة للوقت ومرهقة ، خاصة بالنسبة
                             للشركات التي لديها عدد كبير من المراجعات. هذا هو المكان الذي يمكن أن يأتي فيه “مهتم”.   من خلال الاستفادة من تقنيات التعلم الآلي ومعالجة اللغة الطبيعية ، يمكن لمثل هذه الشركة
                             الناشئة تحليل مراجعات العملاء بسرعة ودقة لتحديد الاتجاهات والأفكار ومجالات التحسين.`}
                />
                <h1>ومن هنا قررنا بدأ رحلة “مهتم”</h1>
            </div>

            <div className='flex flex-col p-20'>
                <h1 className='text-center text-5xl font-bold m-3 text-blue-950'>رؤيتنا</h1>
                <h2 className='text-center text-xl font-bold m-3 text-blue-950'>نحن نتصور مستقبلًا
                    حيث يمكن للشركات تحديد الاتجاهات والمشاعر ومجالات التحسين بسهولة من مراجعات العملاء
                    ، واستخدام هذه المعلومات لتحسين منتجاتهم وخدماتهم وتجربة العملاء بشكل عام. نتصور
                    أيضًا مستقبلًا يشعر فيه العميل بأنه مسموع وقيم ، وحيث يمكن للشركات بناء علاقات قوية
                    وطويلة الأمد مع عملائها من خلال الاستجابات الشخصية وفي الوقت المناسب لملاحظاتهم.</h2>
            </div>

            <div className='flex flex-col  justify-center light-blue-bg h-[300px] w-full'>
                <h1 className='text-center text-blue-950 text-5xl font-bold mb-8'>فريق مهتم</h1>

                <div className="flex mt-8 min-w-fit justify-evenly space-x-5">
                    <h1 className='text-center text-blue-950 text-2xl font-bold'>منيرة الدريبي</h1>
                    <h1 className='text-center text-blue-950 text-2xl font-bold'>شذى المطرفي</h1>
                    <h1 className='text-center text-blue-950 text-2xl font-bold'>ريفان القحمي</h1>
                    <h1 className='text-center text-blue-950 text-2xl font-bold'>رزان الرفاعي</h1>
                </div>
            </div>
            <div className='h-[100px]'></div>
        </div>
    )
}

export default AboutUsPage