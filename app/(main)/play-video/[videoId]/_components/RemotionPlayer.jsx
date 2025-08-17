"use client";
import RemotionComposition from "@/app/_components/RemotionComposition";
import { Player } from "@remotion/player";
import React, { useState } from "react";
import { useVideoConfig } from "remotion";

const RemotionPlayer = ({ videoData }) => {
  const [durationInFrame, setDurationInFrame] = useState(0);
  return (
    <div>
      <Player
        component={RemotionComposition}
        durationInFrames={Number(durationInFrame.toFixed(0)) + 100}
        fps={30}
        compositionHeight={1280}
        compositionWidth={720}
        controls
        style={{
          width: "25vw",
          height: "70vh",
        }}
        inputProps={{
          videoData: videoData,
          setDurationInFrame: (frameValue) => setDurationInFrame(frameValue),
        }}
      />
    </div>
  );
};

export default RemotionPlayer;
