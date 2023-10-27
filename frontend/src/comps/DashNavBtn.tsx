import React from "react";

export type DashNavProps = {
  defaultIcon: React.ReactNode;
  hoverIcon?: React.ReactNode;
  title: string;
  size: "sm" | "md" | "lg" | "xl";
  active: boolean;
};

function DashNav({ defaultIcon, title, hoverIcon, active }: DashNavProps) {
  const activeClass = active ? "bg-blue-950 text-white" : "";
  return (
    <div
      className={`group flex justify-between space-x-2 p-3 rounded transition text-blue-950 hover:bg-blue-950 hover:text-white cursor-pointer font-cursive ${activeClass}`}
    >
      <p className="w-full text-right text-lg">{title}</p>
      <div className={active ? "hidden" : "group-hover:hidden w-6 h-6"}>
        {defaultIcon}
      </div>
      <div
        className={
          active ? "block w-6 h-6" : "hidden group-hover:block w-6 h-6"
        }
      >
        {hoverIcon}
      </div>
    </div>
  );
}

export default DashNav;
