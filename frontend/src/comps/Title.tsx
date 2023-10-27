import React from "react";

export type TitleProps = {
  text: string;
  size: "sm" | "md" | "lg" | "xl";
  desc?: string;
  desc_size?: "sm" | "md" | "lg" | "xl";
  color?: string;
};

function Title({
  text,
  size = "md",
  desc,
  desc_size = "sm",
  color = "blue-950",
}: TitleProps) {
  return (
    <>
      <div className="flex flex-col">
        <h1
          style={{ whiteSpace: "pre-line" }}
          className={`${size}text-right leading-relaxed text-6xl font-cursive font-extrabold text-${color}`}
        >
          {text}
        </h1>

        <h1
          style={{ whiteSpace: "pre-line" }}
          className={`${desc_size} mb-4 text-right leading-relaxed text-l font-cursive text-${color}`}
        >
          {desc}
        </h1>
      </div>
    </>
  );
}

export default Title;
