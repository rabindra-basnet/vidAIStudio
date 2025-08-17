"use client";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { useAuthContext } from "@/app/provider";
import FirebaseAuth from "@/app/_components/FirebaseAuth";

export function LoginForm({ className, ...props }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const { user } = useAuthContext();

  useEffect(() => {
    if (user?.isLoggedIn) {
      router.replace("/dashboard"); // ✅ safe to navigate here
    }
  }, [user, router]);

  return (
    <div className={cn("flex flex-col gap-6", className)} {...props}>
      <Card>
        <CardHeader>
          <CardTitle>Welcome to VidAI Studio</CardTitle>
          <CardDescription>
            Sign in with your Google account to get started
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="flex flex-col gap-6">
            <FirebaseAuth>
              <Button
                disabled={loading}
                className="w-full bg-[#EFB034] hover:bg-[#D29211] active:bg-[#B57E0F] text-[#5D4108] font-medium"
              >
                {loading ? "Signing in..." : "Sign in with Google"}
              </Button>
            </FirebaseAuth>

            <div className="mt-4 text-center text-sm text-gray-600">
              By signing in, you agree to our Terms of Service and Privacy
              Policy
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
