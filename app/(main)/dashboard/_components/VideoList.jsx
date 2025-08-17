"use client";
import { useAuthContext } from "@/app/provider";
import { Button } from "@/components/ui/button";
import { api } from "@/convex/_generated/api";
import { useAuth } from "@clerk/nextjs";
import { useConvex } from "convex/react";
import { RefreshCcw } from "lucide-react";
import moment from "moment";
import Image from "next/image";
import Link from "next/link";
import React, { use, useEffect, useState } from "react";

const VideoList = () => {
  const [videoList, setVideoList] = useState([]);
  const convex = useConvex();
  const { user } = useAuthContext();

  useEffect(() => {
    user && GetUserVideoList();
  }, [user]);

  // use(GetUserVideoList());
  const GetUserVideoList = async () => {
    // ALl user videos
    const result = await convex.query(api.videoData.GetUserVideos, {
      uid: user?._id,
    });
    setVideoList(result);
    const isPendingVideo = result?.find((item) => item.status === "pending");
    console.log("Video List:", result);
    isPendingVideo && GetPendingVideoStatus(isPendingVideo);
  };

  const GetPendingVideoStatus = (isPendingVideo) => {
    // check it with interval
    const intervalId = setInterval(async () => {
      const result = await convex.query(api.videoData.GetVideoById, {
        videoId: isPendingVideo?._id,
      });
      if (result?.status === "completed") {
        clearInterval(intervalId);
        console.log("Video Generated completed:", result);
        GetUserVideoList();
      }
      console.log("Still Pending:", result);
    }, 5000);
  };
  return (
    <div>
      {videoList.length == 0 ? (
        <div className="flex justify-center items-center flex-col mt-28 gap-5 p-5 border border-dashed rounded-xl py-16">
          <Image
            src={"/logo.png"}
            alt="logo"
            width={60}
            height={60}
            className="w-auto h-auto"
          />
          <h2 className="text-gray-400 text-lg">
            You dont have any Video created. Create a new one{" "}
          </h2>
          <Link href={"/create-new-video"}>
            <Button>Create New Video</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mt-10">
          {videoList?.map((video, index) => (
            <div
              // className="w-full relative aspect-[4/3] rounded-xl bg-gray-200 flex items-center justify-center overflow-hidden"
              key={index}
            >
              {video?.status === "completed" ? (
                video?.images && (
                  <Image
                    src={video?.images?.[0] || null}
                    alt={video?.title}
                    width={300}
                    height={300}
                    className="w-full object-cover rounded-xl aspect-auto"
                  />
                )
              ) : (
                <div className="w-full aspect-[2/3] rounded-xl bg-slate-400 flex items-center justify-center gap-2">
                  <RefreshCcw className="animate-spin" />
                  <h2>Generating...</h2>
                </div>
              )}
              <div className="absolute  w-full bottom-5  px-5">
                <h2>{video?.title}</h2>
                <h2 className="text-sm">
                  {moment(video?._creationTime).fromNow()}
                </h2>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoList;
