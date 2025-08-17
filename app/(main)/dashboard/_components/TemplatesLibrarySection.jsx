import React from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Heart, Sparkles } from "lucide-react";
import Image from "next/image";

const TemplatesLibrarySection = () => {
  const templates = [
    {
      id: 1,
      title: "Cyberpunk Neon",
      thumbnail: "/templates/Cyberpunk_Neon.png",
      category: "Sci-Fi",
      premium: false,
    },
    {
      id: 2,
      title: "Medieval Fantasy",
      thumbnail: "/templates/Medieval_Fantasy.png",
      category: "Fantasy",
      premium: true,
    },
    {
      id: 3,
      title: "Vintage Retro",
      thumbnail: "/templates/Vintage_Retro.png",
      category: "Retro",
      premium: false,
    },
    {
      id: 4,
      title: "Modern Minimalist",
      thumbnail: "/templates/Modern_Minimalist.png",
      category: "Modern",
      premium: true,
    },
  ];

  return (
    <div className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-900">Templates Library</h2>
        <Button variant="ghost" className="text-blue-600 hover:text-blue-700">
          Explore more →
        </Button>
      </div>
      <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {templates.map((template) => (
          <Card
            key={template.id}
            className="overflow-hidden border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group"
          >
            <div className="relative h-32">
              <Image
                src={template.thumbnail}
                alt={template.title}
                fill
                className="object-cover"
              />
              {template.premium && (
                <div className="absolute top-2 left-2">
                  <Badge className="bg-gradient-to-r from-yellow-400 to-orange-500 text-white border-0">
                    <Sparkles className="w-3 h-3 mr-1" />
                    Pro
                  </Badge>
                </div>
              )}
              <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300"></div>
              <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <Button size="sm" variant="secondary" className="h-8 w-8 p-0">
                  <Heart className="w-4 h-4" />
                </Button>
              </div>
            </div>
            <CardContent className="p-4">
              <h3 className="font-semibold text-gray-900 truncate">
                {template.title}
              </h3>
              <p className="text-sm text-gray-600">{template.category}</p>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default TemplatesLibrarySection;
