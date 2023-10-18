import React from "react";

export type DashNavProps = {
  defaultIcon: React.ReactNode;
  hoverIcon?: React.ReactNode;
  title: string;
  size: "sm" | "md" | "lg" | "xl";
};

function DashNav({ defaultIcon, title, hoverIcon }: DashNavProps) {
  return (
    <div className=" group flex justify-between space-x-2 p-2 rounded transition text-blue-950 hover:bg-blue-950 hover:text-white cursor-pointer font-cursive ">
      <p className="w-full text-right">{title}</p>
      <div className="group-hover:hidden w-6 h-6">{defaultIcon}</div>
      <div className="hidden group-hover:block w-6 h-6">{hoverIcon}</div>
    </div>
  );
}

export default DashNav;
