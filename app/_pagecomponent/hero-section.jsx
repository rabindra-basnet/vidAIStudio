"use client";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation";
import { useAuthContext } from "../provider";
import Link from "next/link";

export function HeroSection() {
  const router = useRouter();
  const { user } = useAuthContext();

  const handleClick = () => {
    if (!user) {
      router.push("/login"); // redirect to login if not authenticated
      return;
    }
  };

  return (
    <section className="relative min-h-[600px] flex items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-50 via-purple-50 to-indigo-100" />
      <div className="absolute inset-0 bg-gradient-to-r from-purple-600/10 via-blue-600/5 to-indigo-600/10" />

      <div className="relative z-10 text-center max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight">
          Unleash Your Vision with
          <span className="block bg-gradient-to-r from-purple-600 to-blue-600 bg-clip-text text-transparent">
            AI Video
          </span>
        </h1>
        <p className="text-xl text-gray-700 mb-8 max-w-2xl mx-auto leading-relaxed">
          Transform your ideas into stunning videos with our revolutionary
          AI-powered platform. Create, edit, and share professional content in
          minutes.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            onClick={handleClick}
            className="bg-[#EFB034] text-[#5D4108] shadow-xs hover:bg-[#D29211] hover:active:bg-[#B57E0F] disabled:opacity-40 focus-visible:ring-[#EFB034]/20 dark:focus-visible:ring-[#EFB034]/40 text-lg px-8 py-3"
          >
            Get Started For Free
          </Button>
          <Button size="lg" variant={"outline"} className="text-lg py-3" asChild>
            <Link href="/watch-demo"> Watch Demo</Link>
          </Button>
          {/* <Link
            href="/watch-demo"
            className="inline-flex items-center justify-center bg-[#EFB034] text-[#5D4108] shadow-xs hover:bg-[#D29211] hover:active:bg-[#B57E0F] disabled:opacity-40 focus-visible:ring-[#EFB034]/20 dark:focus-visible:ring-[#EFB034]/40 text-lg px-8 py-3 rounded-xl transition-all duration-200"
          >
            Watch Demo
          </Link> */}
        </div>
      </div>
    </section>
  );
}
