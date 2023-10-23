import React, { useEffect } from "react";
import DashNav from "./DashNavBtn";
import home from "./homeIcon.png";
import dash from "./dashIcon.png";
import analysisIcon from "./analysisIcon.png";
import homeH from "./homeIconH.png";
import dashH from "./dashIconH.png";
import analysisIconH from "./analysisIconH.png";
import profileIcon from "./profileIcon.png";
import profileIconH from "./profileIconH.png";
import { Route } from "react-router-dom";
import muhtmLogo from "./muhtmLogo.svg";

import { Link, useLocation } from "react-router-dom";
import { useState } from "react";

function NavSidebar() {
  const location = useLocation();
  const currentPath = location.pathname;


  return (
    <div className=" flex flex-col justify-center items-center w-full">
      <div>
        {
          <img
            src={muhtmLogo}
            alt="My Custom Icon"
            className="h-auto w-[160px]"
          ></img>
        }
      </div>
      <div className="space-y-2">
        <Link
          to="/"
          className={`${currentPath === "/" ? "bg-blue-950 text-white" : ""} block`}
          >
          <DashNav
            defaultIcon={<img src={home} alt="My Custom Icon" />}
            hoverIcon={<img src={homeH} alt="My Custom Icon" />}
            title="الصفحة الرئيسية"
            size="sm"
            active={currentPath === "/"}

          />
        </Link>

        <Link
          to="/dashboard"
          className={`${currentPath === "/" ? "bg-blue-950 text-white" : ""} block`}

        >
          <DashNav
            defaultIcon={<img src={dash} alt="My Custom Icon" />}
            hoverIcon={<img src={dashH} alt="My Custom Icon" />}
            title="لوحة التحكم"
            size="sm"
            active={currentPath === "/dashboard"}

          />
        </Link>

        <Link
          to="/history"
          className={`${currentPath === "/" ? "bg-blue-950 text-white" : ""} block`}
          >
          <DashNav
            defaultIcon={<img src={analysisIcon} alt="My Custom Icon" />}
            hoverIcon={<img src={analysisIconH} alt="My Custom Icon" />}
            title="سجل التحليلات"
            size="sm"
            active={currentPath === "/history"}

          />
        </Link>

        <Link
          to="/profile"
          className={`${currentPath === "/" ? "bg-blue-950 text-white" : ""} block`}
          >
          <DashNav
            defaultIcon={<img src={profileIcon} alt="My Custom Icon" />}
            hoverIcon={<img src={profileIconH} alt="My Custom Icon" />}
            title="الملف الشخصي"
            size="sm"
            active={currentPath === "/profile"}

          />
        </Link>
      </div>
    </div>
  );
}

export default NavSidebar;
