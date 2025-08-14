"use client";
import React, { useState } from "react";
import Topic from "./_components/Topic";
import VideoStyle from "./_components/VideoStyle";

const CreateNewVideo = () => {
  const [formData, setFormData] = useState(null);

  const onHandleInputChange = (fieldname, fieldValue) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldname]: fieldValue,
    }));
    // console.log(formData);
  };
  return (
    <div className="m-3">
      <h2 className="text-3xl">Create New Video</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 mt-8">
        <div className="col-span-2 p-7 border rounded-xl">
          {/* Topic & Script */}
          <Topic onHandleInputChange={onHandleInputChange} />

          {/* Video Image Style */}
          <VideoStyle onHandleInputChange={onHandleInputChange} />

          {/* Voice */}

          {/* Captions */}
        </div>
        <div></div>
      </div>
    </div>
  );
};

export default CreateNewVideo;
