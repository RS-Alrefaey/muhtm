import React, { useEffect, useState } from "react";
import MainNavBar from "../MainNavBar";

import Title from "../Title";
import ImageWithFrame from "../ImgWithFrame";
import Cards from "../Cards";

import backgroundImage from "../images/mainBGimage.png";
import GoalImage from "../images/GoalImage.png";
import savetimeIcon from "../images/savetimeIcon.png";
import devIcon from "../images/devIcon.png";
import cxIcon from "../images/cxIcon.png";
import controlPanelIcon from "../images/controlPanelIcon.png";
import autoSearchIcon from "../images/autoSearchIcon.png";
import chartsIcon from "../images/chartsIcon.png";
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  useEffect(() => {
    document.title = "الصفحة الرئيسية";
  }, []);

  return (
    <div className="w-full h-full flex flex-col justify-center font-cursive">
      <div
        className="bg-center bg-no-repeat bg-cover h-[500px] w-full flex justify-center relative"
        style={{ backgroundImage: `url(${backgroundImage})` }}
      >
        <MainNavBar />

        <div className="w-[500px] h-[300px] bg-white bg-opacity-40 absolute top-1/3 left-1/2 rounded-3xl p-10 flex justify-end text-right">
          <Title
            text={"مهتم، لتحريك أعمالك إلى الأمام"}
            size="xl"
            desc=".نحو تجارة الكترونية أشمل، أفضل، تهتم أكثر"
          />
        </div>
      </div>

      <div className="flex flex-col m-36 justify-center">
        <div className="flex justify-evenly  items-center">
          <div className="w-1/2 mr-16 text-right">
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
        <div className="flex mt-20 justify-evenly space-x-2">
          <Cards
            imageUrl={devIcon}
            title=" التطوير المستمر"
            description="التطوير المستمر يعد من أهم المقومات لبقاء أي مشروع في سوق العمل وضمان المنافسة"
            color="blue-950"
          />
          <Cards
            imageUrl={cxIcon}
            title="تحسين تجربة العميل "
            description="يعد العميل ركيزة أساسية في تطور ونجاح أي مشروع لذلك نسعى في المساعدة لتحسين تجربة العميل"
            color="blue-950"
          />
          <Cards
            imageUrl={savetimeIcon}
            title="توفير الوقت"
            description="عن طريق أتمتة عملية تحليل أراء العملاء وتقديم بعض الدلالات عن مدى رضا العملاء"
            color="blue-950"
          />
        </div>
      </div>

      <div className="flex flex-col justify-center bg-blue-950 w-full items-center ">
        <div className="w-full">
          <h1 className="text-center text-white mt-10 text-5xl font-bold">
            {" "}
            خدماتنا{" "}
          </h1>
        </div>

        <div className="flex mt-16 mb-16 justify-around w-full">
          <Cards
            imageUrl={chartsIcon}
            title="رسوم بيانية"
            description={`يتم عرض النتائج في رسوم بيانية \n ويمكن مقارنتها بالسجلات السابقة `}
            color="#FFFFFF"
          />
          <Cards
            imageUrl={autoSearchIcon}
            title="أتمتة تحليل التعليقات"
            description={`لا داعي لتخصيص المزيد من وقتك الثمين \n لأجل تحليل اراء عملاءك`}
            color="#FFFFFF"
          />
          <Cards
            imageUrl={controlPanelIcon}
            title="واجهة تحكم سلسة"
            description={`لإدارة عملية التحليل بشكل سلس، عملي وبسيط`}
            color="#FFFFFF"
          />
        </div>
      </div>

      <div className="flex flex-col m-20 justify-center">
        <h1 className="text-center text-blue-950 text-2xl font-bold">
          {" "}
          هل أنت مستعد لنقل نمو عملك إلى المستوى التالي؟{" "}
        </h1>

        <div className="flex mt-8 min-w-fit justify-center space-x-5">
          <button className="button-prim" onClick={() => navigate("/contact")}>
            تواصل معنا
          </button>
          <button className="button-prim" onClick={() => navigate("/signup")}>
            سجل الآن
          </button>
        </div>
      </div>
    </div>
  );
}

export default HomePage;
