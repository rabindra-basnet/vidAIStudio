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
            <Button variant={"orange"}>Create New Video</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-5 mt-10">
          {videoList?.map((video, index) => (
            <Link href={"/play-video/" + video?._id} key={index}>
              <div className="relative w-full max-w-4xl h-[450px] mx-auto rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition cursor-pointer">
                {video?.status === "completed" ? (
                  video?.images && (
                    <Image
                      src={video?.images?.[0] || "/placeholder.png"}
                      alt={video?.title}
                      width={800}
                      height={450}
                      className="w-full h-full object-cover aspect-auto"
                    />
                  )
                ) : (
                  <div className="w-full h-full flex items-center justify-center bg-slate-300">
                    <RefreshCcw className="animate-spin text-gray-600" />
                    <span className="ml-2 text-gray-600 font-semibold">
                      Generating...
                    </span>
                  </div>
                )}

                {/* Footer with title and time */}
                <div className="absolute bottom-0 w-full bg-gradient-to-t from-black/70 to-transparent p-5 text-white">
                  <h2 className="text-2xl font-bold">{video?.title}</h2>
                  <p className="text-sm">
                    {moment(video?._creationTime).fromNow()}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default VideoList;
