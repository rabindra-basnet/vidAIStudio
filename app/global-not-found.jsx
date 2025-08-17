import Link from "next/link";
import { Outfit } from "next/font/google";
import "./globals.css";
import { Button } from "@/components/ui/button";

const inter = Outfit({ subsets: ["latin"] });

export const metadata = {
  title: "Coming Soon",
  description: "This feature is under development and will be available soon.",
};

export default function NotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body>
        <div className="min-h-screen p-6 sm:p-8 md:p-10 flex items-center justify-center">
          <div className="container mx-auto max-w-6xl text-center">
            <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold mb-6">
              Coming Soon
            </h1>
            <p className="text-lg sm:text-xl text-gray-600 dark:text-gray-400 mb-8">
              This feature is under development and will be available soon. Stay
              tuned!
            </p>
            <Link href="/dashboard">
              <Button className="px-6 py-3 text-white bg-[#EFB034] hover:bg-[#D29211] active:bg-[#B57E0F] transition-colors rounded-xl font-medium">
                Back to Dashboard
              </Button>
            </Link>
          </div>
        </div>
      </body>
    </html>
  );
}
