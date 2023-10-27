import React from "react";

type Cards = {
  imageUrl: string;
  title: string;
  description: string;
  color: string;
};

function Cards({ imageUrl, title, description, color }: Cards) {
  return (
    <>
      <div className="flex flex-col items-center justify-items-center space-y-4 w-[350px]">
        <img src={imageUrl} alt={title} className="w-20 h-20" />
        <h2 className="text-2xl font-bold" style={{ color: color }}>
          {title}
        </h2>
        <p className="text-center" style={{ color: color }}>
          {description}
        </p>
      </div>
    </>
  );
}

export default Cards;
