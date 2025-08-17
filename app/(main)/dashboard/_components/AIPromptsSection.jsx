import React from 'react'
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Bookmark } from "lucide-react";

const AIPromptsSection = () => {
  const aiPrompts = [
    {
      id: 1,
      title: "A futuristic cityscape at night with neon lights reflecting on wet streets",
      category: "Urban",
      likes: 234,
      icon: "🌃"
    },
    {
      id: 2,
      title: "A peaceful forest with sunlight streaming through ancient trees",
      category: "Nature",
      likes: 189,
      icon: "🌲"
    },
    {
      id: 3,
      title: "An underwater scene with colorful coral reefs and marine life",
      category: "Ocean",
      likes: 156,
      icon: "🐠"
    },
    {
      id: 4,
      title: "A mystical castle floating among clouds in the sky",
      category: "Fantasy",
      likes: 298,
      icon: "🏰"
    },
    {
      id: 5,
      title: "A bustling marketplace in an ancient Middle Eastern city",
      category: "Historical",
      likes: 167,
      icon: "🏺"
    },
    {
      id: 6,
      title: "A serene mountain lake at sunset with perfect reflections",
      category: "Landscape",
      likes: 203,
      icon: "🏔️"
    }
  ];

  return (
    <div>
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">AI Video Suggested Prompts</h2>
        <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
          Explore more →
        </Button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {aiPrompts.map((prompt) => (
          <Card key={prompt.id} className="p-4 border-0 shadow-md hover:shadow-lg transition-all duration-300 cursor-pointer group">
            <div className="flex items-start gap-4">
              <div className="text-2xl">{prompt.icon}</div>
              <div className="flex-1">
                <p className="text-sm text-gray-700 leading-relaxed mb-2">{prompt.title}</p>
                <div className="flex items-center justify-between">
                  <Badge variant="outline" className="text-xs">
                    {prompt.category}
                  </Badge>
                  <div className="flex items-center gap-1 text-gray-500">
                    <Heart className="w-4 h-4" />
                    <span className="text-sm">{prompt.likes}</span>
                  </div>
                </div>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="ghost" className="h-8 w-8 p-0">
                  <Bookmark className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  )
}

export default AIPromptsSection;