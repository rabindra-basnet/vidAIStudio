"use client";
import React, { useState, useRef } from "react";
import Topic from "./_components/Topic";
import VideoStyle from "./_components/VideoStyle";
import Voice from "./_components/Voice";
import Caption from "./_components/Caption";
import { Button } from "@/components/ui/button";
import { Loader2Icon, WandSparkles } from "lucide-react";
import Preview from "./_components/Preview";
import axios from "axios";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { useAuthContext } from "@/app/provider";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

const requiredFields = [
  "script",
  "topic",
  "voice",
  "captionStyle",
  "videoStyle",
];

const CreateNewVideo = () => {
  const { user } = useAuthContext();
  const [formData, setFormData] = useState({});
  const scrollRef = useRef(null);
  const [loading, setLoading] = useState(false);
   const router = useRouter();


  const CreateInitialVideoRecord = useMutation(api.videoData.CreateVideoData);

  const onHandleInputChange = (fieldname, fieldValue) => {
    setFormData((prevData) => ({
      ...prevData,
      [fieldname]: fieldValue,
    }));
  };

  const GenerateVideo = async () => {
    if (user?.credits <= 0) {
      toast(
        "You dont have enough credits to generate video. Please upgrade your plan."
      );
      return;
    }
    const missingFields = requiredFields.filter((field) => !formData?.[field]);

    if (missingFields.length) {
      toast.error(
        `Please fill all required fields: ${missingFields.join(", ")}`
      );
      return;
    }

    setLoading(true);
    try {
      // Step 1: Save video record first
      const recordId = await CreateInitialVideoRecord({
        title: formData.title,
        topic: formData.topic,
        script: formData.script,
        captionStyle: formData.captionStyle,
        videoStyle: formData.videoStyle,
        voice: formData.voice,
        uid: user?._id,
        createdBy: user?.email,
        credits: user?.credits,
      });

      console.log("Video Data Created:", recordId);

      // Step 2: Trigger backend job
      const response = await axios.post("/api/generate-video-data", {
        ...formData,
        recordId,
      });

      const result = response.data;

      if (result?.success === false) {
        // Backend returned an error (from Inngest throw)
        toast.error(
          result.error || "Video generation failed. Try again later."
        );
      } else {
        // Redirect to dashboard after a short delay (so the toast is visible)
        setTimeout(() => {
          toast.success("Video generation started successfully!");
          router.push("/dashboard");
        }, 1000); // 1 second delay
        console.log("Job queued:", result);
      }
    } catch (error) {
      console.error(error);
      const errMsg =
        error.response?.data?.error ||
        error.message ||
        "Failed to generate video. Check console for details.";
      toast.error(errMsg);
    } finally {
      setLoading(false);
    }
  };

  const missingFields = requiredFields.filter((field) => !formData?.[field]);

  return (
    <div className="m-3">
      <h2 className="text-3xl mb-4">Create New Video</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-7 mt-8">
        <div
          ref={scrollRef}
          className="col-span-2 p-7 border rounded-xl h-[75vh] overflow-auto scroll-smooth scrollbar-hide space-y-6"
        >
          {/* Topic & Script */}
          <Topic
            onHandleInputChange={onHandleInputChange}
            isRequired
            isMissingTitle={missingFields.includes("title")}
            isMissingTopic={missingFields.includes("topic")}
          />

          {/* Video Image Style */}
          <VideoStyle
            onHandleInputChange={onHandleInputChange}
            isRequired
            isMissing={missingFields.includes("videoStyle")}
          />

          {/* Voice */}
          <Voice
            onHandleInputChange={onHandleInputChange}
            isRequired
            isMissing={missingFields.includes("voice")}
          />

          {/* Caption */}
          <Caption
            onHandleInputChange={onHandleInputChange}
            isRequired
            isMissing={missingFields.includes("captionStyle")}
          />

          <Button
            className="mt-1 w-full disabled:opacity-50 disabled:cursor-not-allowed"
            size="lg"
            variant="orange"
            onClick={GenerateVideo}
            disabled={loading || missingFields.length > 0}
          >
            {loading ? (
              <>
                <Loader2Icon className="animate-spin" />
                Generating...
              </>
            ) : (
              <>
                <WandSparkles />
                Generate Video
              </>
            )}
          </Button>
        </div>
        <div>
          <Preview formData={formData} />
        </div>
      </div>
    </div>
  );
};

export default CreateNewVideo;
