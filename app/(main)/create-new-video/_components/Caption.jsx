import React, { useState } from "react";

const options = [
  {
    name: "Youtuber",
    style:
      "text-yellow-400 text-3xl font-extrabold  italic uppercase tracking-wide drop-shadow-md px-3 py-1 rounded-lg",
    genre: "Entertainment",
  },
  {
    name: "Supreme",
    style:
      "text-white text-3xl font-bold italic drop-shadow-lg tracking-tight px-3 py-1 rounded-lg",
    genre: "Street/Urban",
  },
  {
    name: "Neon",
    style:
      "text-pink-500 text-3xl font-bold italic drop-shadow-lg tracking-tight px-3 py-1 rounded-lg",
    genre: "Cyberpunk/Futuristic",
  },
  {
    name: "Modern",
    style: "text-purple-400 text-3xl font-light italic",
    genre: "Lifestyle/Minimal",
  },
  {
    name: "Retro",
    style:
      "text-orange-400 text-3xl font-extrabold italic uppercase tracking-wider drop-shadow-sm px-3 py-1 rounded-lg",
    genre: "Vintage/80s",
  },
  {
    name: "Gaming",
    style:
      "text-green-400 text-3xl font-bold italic uppercase tracking-tight drop-shadow-md px-3 py-1 rounded-lg",
    genre: "Gaming/Tech",
  },
  {
    name: "Elegant",
    style:
      "text-violet-400 text-3xl font-light italic tracking-wide drop-shadow-sm px-3 py-1 rounded-lg",
    genre: "Luxury/Soft",
  },
];

const Caption = ({ onHandleInputChange, isMissing }) => {
  const [selectedCaption, setSelectedCaption] = useState();

  return (
    <div className="mt-5">
      <h2 className="text-xl font-bold mb-1 dark:text-white">
        Captions<span className="text-red-500">*</span>
      </h2>
      <p
        className={`text-sm mb-3 ${
          isMissing ? "text-red-500" : "text-gray-400 dark:text-gray-400"
        }`}
      >
        {isMissing
          ? "You must select a caption style before continuing."
          : `Selected caption style: ${selectedCaption}`}
      </p>

      <div className="flex flex-wrap gap-4">
        {options.map((option, index) => {
          const isSelected = selectedCaption === option.name;

          return (
            <div
              key={index}
              className={`
                p-3 cursor-pointer rounded-lg transition-all duration-200
                ${
                  isSelected
                    ? "border-2 border-blue-500 dark:bg-blue-900 shadow-lg"
                    : " bg-slate-100 dark:bg-gray-800 hover:shadow-md"
                }
                hover:scale-105
              `}
              onClick={() => {
                setSelectedCaption(option.name);
                onHandleInputChange("captionStyle", option);
              }}
            >
              <h2 className={`${option.style}`}>{option.name}</h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Caption;
