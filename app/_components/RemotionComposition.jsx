"use client";
import React, { useEffect } from "react";
import {
  AbsoluteFill,
  Audio,
  Img,
  interpolate,
  Sequence,
  useCurrentFrame,
  useVideoConfig,
} from "remotion";

const RemotionComposition = ({ videoData, setDurationInFrame }) => {
  const captions = videoData?.captionJson;
  const { fps } = useVideoConfig();
  const frame = useCurrentFrame();

  const imageList = videoData?.images;
  // useEffect(() => {
  //   videoData && getDurationFrame();
  // }, [videoData]);
  // const getDurationFrame = () => {
  //   const totalDuration = captions[captions?.length - 1]?.end * fps;
  //   setDurationInFrame(totalDuration);
  //   return totalDuration;
  // };
  useEffect(() => {
    if (videoData && captions?.length > 0) {
      const totalDuration = captions[captions.length - 1]?.end * fps;
      setDurationInFrame(totalDuration);
    }
  }, [videoData, captions, setDurationInFrame, fps]);

  // Optional: Use getDurationFrame for rendering, not state updates
  const getDurationFrame = () => {
    return captions[captions?.length - 1]?.end * fps;
  };

  const getCurrentCaptions = () => {
    const currentTime = frame / 30;
    const currentCaption = captions?.find(
      (item) => currentTime >= item?.start && currentTime <= item?.end
    );
    return currentCaption ? currentCaption?.word : "";
  };
  return (
    <div className="flex justify-center items-center h-full">
      <AbsoluteFill>
        {imageList?.map((item, index) => {
          const startTime = (index * getDurationFrame()) / imageList?.length;
          const duration = getDurationFrame();
          const scale = (index) =>
            interpolate(
              frame,
              [startTime, startTime + duration / 2, startTime + duration],
              index % 2 == 0 ? [1, 1.8, 1] : [1.8, 1, 1.8],
              {
                extrapolateLeft: "clamp",
                extrapolateRight: "clamp",
              }
            );
          return (

              <Sequence
                key={index}
                from={startTime}
                durationInFrames={duration}
              >
                <AbsoluteFill>
                  <Img
                    src={item}
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      transform: `scale(${scale(index)})`,
                    }}
                  />
                </AbsoluteFill>
              </Sequence>

          );
        })}
        {videoData?.audioUrl && <Audio src={videoData?.audioUrl} />}
      </AbsoluteFill>
      <AbsoluteFill
        style={{
          color: "white",
          justifyContent: "center",
          bottom: 50,
          height: 150,
          fontSize: 50,
          top: "",
          textAlign: "center",
        }}
      >
        <h2>{getCurrentCaptions()}</h2>
      </AbsoluteFill>
    </div>
  );
};

export default RemotionComposition;
