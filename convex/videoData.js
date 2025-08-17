import { v } from "convex/values";
import { mutation, query } from "./_generated/server";

export const CreateVideoData = mutation({
  args: {
    title: v.string(),
    topic: v.string(),
    script: v.string(),
    captionStyle: v.any(),
    videoStyle: v.string(),
    voice: v.string(),
    uid: v.id("users"),
    createdBy: v.string(),
    credits: v.optional(v.number()),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.insert("videoData", {
      title: args.title,
      topic: args.topic,
      script: args.script,
      captionStyle: args.captionStyle,
      videoStyle: args.videoStyle,
      voice: args.voice,
      uid: args.uid,
      createdBy: args.createdBy,
      status: "pending",
    });
    await ctx.db.patch(args.uid, {
      credits: (args?.credits ?? 0) - 1, 
    });

    console.log("Video Data Created:", result);
    return result;
  },
});

export const UpdateVideoRecord = mutation({
  args: {
    recordId: v.id("videoData"),
    audioUrl: v.string(),
    captionJson: v.any(),
    images: v.any(),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.patch(args.recordId, {
      audioUrl: args.audioUrl,
      captionJson: args.captionJson,
      images: args.images,
      status: "completed",
    });
    return result;
  },
});

export const GetUserVideos = query({
  args: {
    uid: v.id("users"),
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.query("videoData")
      .filter((q) => q.eq(q.field("uid"), args.uid))
      .order("desc")
      .collect();
    return result;
  },
})

export const GetVideoById = query({
  args: {
   videoId: v.id("videoData"),  
  },
  handler: async (ctx, args) => {
    const result = await ctx.db.get(args.videoId);
    return result;
  },
})
