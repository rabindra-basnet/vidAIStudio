"use client";
import React, { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Plus, Play, Video, Eye, Clock, RefreshCcw } from "lucide-react";
import Link from "next/link";
import Image from "next/image";
import { useAuthContext } from "@/app/provider";
import { api } from "@/convex/_generated/api";
import { useConvex } from "convex/react";
import moment from "moment";

const RecentProjectsSection = () => {
  const [videoList, setVideoList] = useState([]);
  const convex = useConvex();
  const { user } = useAuthContext();

  useEffect(() => {
    user && GetUserVideoList();
  }, [user]);

  const GetUserVideoList = async () => {
    try {
      // All user videos
      const result = await convex.query(api.videoData.GetUserVideos, {
        uid: user?._id,
      });
      setVideoList(result);
      const isPendingVideo = result?.find((item) => item.status === "pending");
      console.log("Video List:", result);
      isPendingVideo && GetPendingVideoStatus(isPendingVideo);
    } catch (error) {
      console.error("Error fetching videos:", error);
    }
  };

  const GetPendingVideoStatus = (isPendingVideo) => {
    // check it with interval
    const intervalId = setInterval(async () => {
      try {
        const result = await convex.query(api.videoData.GetVideoById, {
          videoId: isPendingVideo?._id,
        });
        if (result?.status === "completed") {
          clearInterval(intervalId);
          console.log("Video Generated completed:", result);
          GetUserVideoList();
        }
        console.log("Still Pending:", result);
      } catch (error) {
        console.error("Error checking video status:", error);
        clearInterval(intervalId);
      }
    }, 5000);

    // Clear interval after 10 minutes to prevent infinite polling
    setTimeout(() => {
      clearInterval(intervalId);
    }, 600000);
  };

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Recent Projects</h2>
        {videoList.length > 0 && (
          <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
            View all →
          </Button>
        )}
      </div>

      {videoList.length === 0 ? (
        <Card className="p-12 border-2 border-dashed border-gray-300 text-center">
          <div className="flex flex-col items-center gap-4">
            <div className="w-16 h-16 bg-gray-100 rounded-full flex items-center justify-center">
              <Video className="w-8 h-8 text-gray-400" />
            </div>
            <div>
              <h3 className="text-xl font-semibold text-gray-700 mb-2">
                No videos yet
              </h3>
              <p className="text-gray-500 mb-4">
                You don't have any videos created. Create a new one!
              </p>
            </div>
            <Link href="/create-new-video">
              <Button className="bg-gradient-to-r from-orange-500 to-pink-500 hover:from-orange-600 hover:to-pink-600 text-white">
                <Plus className="w-4 h-4 mr-2" />
                Create New Video
              </Button>
            </Link>
          </div>
        </Card>
      ) : (
        <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {videoList.map((video, index) => (
            <Link href={`/play-video/${video._id}`} key={video._id || index}>
              <Card className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <div className="relative h-48 bg-gradient-to-br from-gray-200 to-gray-300">
                  {video.status === "completed" ? (
                    video.images && video.images.length > 0 ? (
                      <>
                        <Image
                          src={video.images[0]}
                          alt={video.title}
                          fill
                          className="object-cover"
                        />
                        <div className="absolute top-4 right-4">
                          <Badge
                            variant="secondary"
                            className="bg-black/70 text-white"
                          >
                            <Clock className="w-3 h-3 mr-1" />
                            Video
                          </Badge>
                        </div>
                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors duration-300 flex items-center justify-center opacity-0 group-hover:opacity-100">
                          <Play className="w-12 h-12 text-white" />
                        </div>
                      </>
                    ) : (
                      <div className="absolute inset-0 bg-gradient-to-br from-blue-400 to-purple-500 flex items-center justify-center">
                        <div className="text-center text-white">
                          <Video className="w-12 h-12 mx-auto mb-2" />
                          <span className="text-sm font-medium">
                            Video Ready
                          </span>
                        </div>
                      </div>
                    )
                  ) : video.status === "pending" ? (
                    <div className="absolute inset-0 bg-slate-300 flex items-center justify-center">
                      <div className="text-center">
                        <RefreshCcw className="animate-spin w-8 h-8 text-gray-600 mx-auto mb-2" />
                        <span className="text-sm text-gray-600 font-semibold">
                          Generating...
                        </span>
                      </div>
                    </div>
                  ) : (
                    <div className="absolute inset-0 bg-yellow-100 flex items-center justify-center">
                      <div className="text-center">
                        <Clock className="w-8 h-8 text-yellow-600 mx-auto mb-2" />
                        <span className="text-sm text-yellow-700 font-semibold">
                          Processing...
                        </span>
                      </div>
                    </div>
                  )}
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-gray-900 mb-2 truncate">
                    {video.title}
                  </h3>
                  <div className="flex items-center justify-between text-sm text-gray-600">
                    <div className="flex items-center gap-1">
                      <Eye className="w-4 h-4" />
                      <span>{video.views || "0"}</span>
                    </div>
                    <div className="flex items-center gap-1">
                      <Clock className="w-4 h-4" />
                      <span>{moment(video._creationTime).fromNow()}</span>
                    </div>
                  </div>
                  {video.status === "pending" && (
                    <div className="mt-2">
                      <Badge
                        variant="outline"
                        className="text-xs text-blue-600 border-blue-200"
                      >
                        Processing
                      </Badge>
                    </div>
                  )}
                  {video.status === "completed" && (
                    <div className="mt-2">
                      <Badge
                        variant="outline"
                        className="text-xs text-green-600 border-green-200"
                      >
                        Ready
                      </Badge>
                    </div>
                  )}
                </CardContent>
              </Card>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
};

export default RecentProjectsSection;
