import { defineSchema, defineTable } from "convex/server";
import { v } from "convex/values";

export default defineSchema({
    users: defineTable({
        name: v.string(),
        email: v.string(),
        pictureURL: v.string(),
        credits: v.number()
    }),
    videoData: defineTable({
        title: v.string(),
        topic: v.string(),
        script: v.string(),
        captionStyle: v.any(),
        videoStyle: v.string(),
        voice: v.string(),
        audioUrl: v.optional(v.string()),
        images: v.optional(v.any()),
        captionJson: v.optional(v.any()),
        videoUrl: v.optional(v.string()),
        uid: v.id("users"),
        createdBy: v.string(),
        status:v.optional(v.string()),
    })
})
