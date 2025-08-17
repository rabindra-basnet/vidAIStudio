import Image from "next/image";
import React from "react";
import { options } from "./VideoStyle";

const Preview = ({ formData }) => {
  const selectedVideoStyle =
    formData && options?.find((item) => item?.name === formData?.videoStyle);
  return (
    <div className="relative">
        <h2 className="mb-3 text-2xl font-bold">Preview</h2>
      {selectedVideoStyle && (
        <Image
          src={selectedVideoStyle?.image}
          alt={selectedVideoStyle?.name}
          width={1000}
          height={300}
          className="w-full h-[70vh] object-cover rounded-xl"
        />
      )}
      <h2 className={` absolute bottom-8 text-center w-full ${formData?.captionStyle?.style}`}>{formData?.captionStyle?.name}</h2>
    </div>
  );
};

export default Preview;
