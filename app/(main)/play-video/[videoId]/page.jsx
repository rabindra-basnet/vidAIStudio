// "use client";
// import React, { useEffect, useState } from "react";
// import RemotionPlayer from "./_components/RemotionPlayer";
// import VideoMeta from "./_components/VideoMeta";
// import { useConvex } from "convex/react";
// import { api } from "@/convex/_generated/api";
// import { useParams } from "next/navigation";

// const PlayVideo = () => {
//   const { videoId } = useParams();
//   const convex = useConvex();
//   const [videoData, setVideoData] = useState();

//   useEffect(() => {
//     videoId && GetVideonById();
//   }, [videoData]);

//   const GetVideonById = async () => {
//     const result = await convex.query(api.videoData.GetVideoById, {
//       videoId: videoId,
//     });
//     setVideoData(result);
//     console.log("Video Data:", result);
//   };
//   return (
//     <div className="grid grid-cols-1 md:grid-cols-2 gap">
//       <div>
//         {/* <h2 className="text-3xl font-bold">Video Preview</h2>
//         <hr className="mb-5" />
//         <pre>{JSON.stringify(videoData, null, 2)}</pre> */}
//         {/* Remotion Player */}
//         <RemotionPlayer videoData={videoData} />
//       </div>
//       <div>
//         {/* Video Information */}
//         <VideoMeta videoData={videoData} />
//       </div>
//     </div>
//   );
// };

// export default PlayVideo;

"use client";
import React, { useEffect, useState } from "react";
import RemotionPlayer from "./_components/RemotionPlayer";
import VideoMeta from "./_components/VideoMeta";
import { useConvex } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useParams } from "next/navigation";

const PlayVideo = () => {
  const { videoId } = useParams();
  const convex = useConvex();
  const [videoData, setVideoData] = useState(null);

  useEffect(() => {
    if (videoId) {
      GetVideonById();
    }
  }, [videoId]);

  const GetVideonById = async () => {
    try {
      const result = await convex.query(api.videoData.GetVideoById, {
        videoId: videoId,
      });
      setVideoData(result);
      console.log("Video Data:", result);
    } catch (error) {
      console.error("Error fetching video data:", error);
    }
  };

  return (
    <>
      <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-8 text-center">
        Video Preview
      </h2>
      <div className="min-h-screen p-6 sm:p-8 md:p-10">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="flex flex-col items-center">
              <div className="w-full max-w-lg">
                {videoData ? (
                  <RemotionPlayer videoData={videoData} />
                ) : (
                  <div className="w-full h-96 flex items-center justify-center">
                    <p>Loading video...</p>
                  </div>
                )}
              </div>
            </div>
            <div className="flex flex-col items-center">
              <div className="w-full max-w-lg">
                <VideoMeta videoData={videoData} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default PlayVideo;
