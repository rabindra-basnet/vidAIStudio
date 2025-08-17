import React from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Plus, Play, Sparkles, Video, Eye } from "lucide-react";
import Link from "next/link";

const HeroSection = () => {
  return (
    <div className="grid lg:grid-cols-2 gap-8 mb-12">
      {/* Main Video Preview */}
      <div className="relative">
        <Card className="overflow-hidden border-0 shadow-2xl">
          <div className="relative h-80 bg-gradient-to-br from-emerald-400 to-cyan-600">
            <div className="absolute inset-0 bg-black/20"></div>
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white">
                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-4 backdrop-blur-sm">
                  <Play className="w-8 h-8" />
                </div>
                <h3 className="text-2xl font-bold mb-2">
                  Create Your First Video
                </h3>
                <p className="text-white/90">
                  Transform your ideas into stunning AI-generated videos
                </p>
              </div>
            </div>
            {/* Floating character illustration */}
            <div className="absolute bottom-4 right-4 w-24 h-32 bg-white/10 rounded-lg backdrop-blur-sm border border-white/20 flex items-center justify-center">
              <div className="text-4xl">🎬</div>
            </div>
          </div>
        </Card>
      </div>

      {/* Quick Actions */}
      <div className="space-y-6">
        <Card className="p-6 border-0 shadow-lg">
          <div className="flex items-center gap-4 mb-6">
            <div className="w-12 h-12 bg-gradient-to-br from-orange-400 to-pink-500 rounded-xl flex items-center justify-center">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div>
              <h3 className="text-xl font-bold text-gray-900">
                Create Stunning
              </h3>
              <p className="text-gray-600">AI Generated Videos in Minutes!</p>
            </div>
          </div>
          <Link href="/create-new-video">
            <Button variant={"gradiant"} className="w-full ">
              <Plus className="w-5 h-5 mr-2" />
              Start Creating
            </Button>
          </Link>
        </Card>

        {/* Quick Stats */}
        <div className="grid grid-cols-2 gap-4">
          <Card className="p-4 border-0 shadow-lg">
            <div className="flex items-center gap-3">
              <Video className="w-8 h-8 text-blue-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900">12</p>
                <p className="text-sm text-gray-600">Videos Created</p>
              </div>
            </div>
          </Card>
          <Card className="p-4 border-0 shadow-lg">
            <div className="flex items-center gap-3">
              <Eye className="w-8 h-8 text-green-500" />
              <div>
                <p className="text-2xl font-bold text-gray-900">2.4K</p>
                <p className="text-sm text-gray-600">Total Views</p>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;
