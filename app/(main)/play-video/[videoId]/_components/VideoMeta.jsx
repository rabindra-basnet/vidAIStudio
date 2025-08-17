import { Button } from "@/components/ui/button";
import { ArrowLeft, DownloadIcon } from "lucide-react";
import Link from "next/link";
import React from "react";

const VideoMeta = ({ videoData }) => {
  if (!videoData) {
    return null;
  }

  return (
    <div className="max-w-xl mx-auto p-6 bg-white rounded-2xl shadow-lg border border-gray-200">
      {/* Back Button */}
      <Link href="/dashboard">
        <h2 className="flex items-center gap-2 text-gray-600 cursor-pointer hover:text-gray-900 transition-colors">
          <ArrowLeft className="w-5 h-5" /> Back to Dashboard
        </h2>
      </Link>

      {/* Project Info */}
      <div className="mt-6 space-y-4">
        <div>
          <h3 className="text-lg font-semibold text-gray-800">Project Name</h3>
          <p className="text-gray-700 mt-1">{videoData.title}</p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800">Script</h3>
          <p className="text-gray-700 mt-1 whitespace-pre-line">
            {videoData.script}
          </p>
        </div>

        <div>
          <h3 className="text-lg font-semibold text-gray-800">Video Style</h3>
          <p className="text-gray-700 mt-1">{videoData.videoStyle}</p>
        </div>
      </div>

      {/* Download Button */}
      <Button disabled variant={"orange"} className="w-full transition-colors text-black rounded-xl font-medium">
        <DownloadIcon className="w-5 h-5" /> Export & Download Video
      </Button>
    </div>
  );
};

export default VideoMeta;
