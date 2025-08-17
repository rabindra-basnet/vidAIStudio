import Image from "next/image";
import React, { useState } from "react";

export const options = [
  { name: "Realistic", image: "/videostyle/Realistic.png" },
  { name: "Cinematic", image: "/videostyle/Cinematic.png" },
  { name: "Cartoon", image: "/videostyle/Cartoon.png" },
  { name: "Watercolor", image: "/videostyle/Watercolor.png" },
  { name: "Cyberpunk", image: "/videostyle/Cyberpunk.png" },
  { name: "GTA", image: "/videostyle/GTA.png" },
  { name: "Fantasy", image: "/videostyle/Fantasy.png" },
  { name: "Sci-Fi", image: "/videostyle/Sci-Fi.png" },
];

const VideoStyle = ({ onHandleInputChange, isRequired, isMissing }) => {
  const [selectedStyle, setSelectedStyle] = useState();

  return (
    <div className="mt-5">
      <h2 className="text-lg font-semibold mb-2 flex items-center gap-1">
        Video Styles {isRequired && <span className="text-red-500">*</span>}
      </h2>
      <p
        className={`text-sm mb-2 ${
          isMissing ? "text-red-500" : "text-gray-400"
        }`}
      >
        {isMissing
          ? "Please select a video style."
          : `Selected Video Style: ${selectedStyle}`}
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-2 ">
        {options.map((option, index) => {
          const isSelected = option.name === selectedStyle;
          return (
            <div
              key={index}
              onClick={() => {
                setSelectedStyle(option.name);
                onHandleInputChange("videoStyle", option.name);
              }}
              className={`group relative cursor-pointer rounded-lg overflow-hidden transition-all ${
                isSelected ? "ring-2 ring-blue-500" : ""
              } hover:scale-105`}
            >
              <Image
                className="w-full h-full object-cover transition-transform duration-300"
                src={option.image}
                alt={option.name}
                width={700}
                height={700}
              />
              <h2
                className={`absolute bottom-0 text-center w-full py-2 text-gray-100 font-medium ${
                  isSelected ? "bg-blue-500/60" : "bg-black/30"
                }`}
              >
                {option.name}
              </h2>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default VideoStyle;
