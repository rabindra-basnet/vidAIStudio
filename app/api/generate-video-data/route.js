import { NextResponse } from "next/server";
import { inngest } from "@/inngest/client";

export async function POST(req) {
    const formData = await req.json();

    // try {
    // Trigger the Inngest function
    const result = await inngest.send({
        name: "generate-video-data",
        data: { ...formData },
    });

    return NextResponse.json({ success: true, result: result });
}
//         // Poll for the function's outcome (or use a webhook/event listener)
//         const result = await inngest.waitForRun(run.runId, {
//             timeout: "30s", // Adjust timeout as needed
//         });

//         if (result.status === "completed") {
//         } else if (result.status === "failed") {
//             return NextResponse.json({
//                 success: false,
//                 error: result.error || "Function execution failed",
//             });
//         } else {
//             return NextResponse.json({
//                 success: false,
//                 error: "Function timed out or is still running",
//             });
//         }
//     } catch (err) {
//         console.error("Error generating video:", err);
//         return NextResponse.json({
//             success: false,
//             error: err?.message || "Unknown error occurred",
//         });
//     }
// }