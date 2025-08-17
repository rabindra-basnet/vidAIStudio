import { Inngest } from "inngest";

const APP_ID = process.env.NEXT_PUBLIC_INNGEST_APP_ID;
export const inngest = new Inngest({ id: APP_ID }); // Use your app's ID