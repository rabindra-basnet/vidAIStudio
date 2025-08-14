"use client";
import { Input } from "@/components/ui/input";
import React, { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Loader2Icon, SparklesIcon } from "lucide-react";
import axios from "axios";

const suggestion = [
  "Historic Story",
  "Kids Story",
  "Movie Story",
  "AI Innovations",
  "Space Mysteries",
  "Horror Stories",
  "Mythological Tales",
  "Tech BreakThroughs",
  "Fantasy Adventures",
  "Science Experiments",
  "Motivational Stories",
];

const Topic = ({ onHandleInputChange }) => {
  const [selectedTopic, setSelectedTopic] = useState("");
  const [selectedScript, setSelectedScript] = useState(null);
  const [scripts, setScripts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [activeTab, setActiveTab] = useState("suggestion");

  const GenerateScript = async () => {
    if (!selectedTopic) return;
    setLoading(true);
    try {
      const result = await axios.post("/api/generate-script", {
        topic: selectedTopic,
      });
      setScripts(result?.data?.scripts || []);
      setSelectedScript(null); // reset selected script
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleTopicChange = (topic) => {
    setSelectedTopic(topic);
    setSelectedScript(null);
    onHandleInputChange("topic", topic);
    onHandleInputChange("script", null);
  };

  return (
    <div>
      {/* Project Title */}
      <div>
        <h2 className="mb-3">Project Title</h2>
        <Input
          placeholder="Enter your project title"
          className="w-full"
          onChange={(e) => onHandleInputChange("title", e.target.value)}
        />
      </div>

      {/* Video Topic */}
      <div className="my-3">
        <h2>Video Topic</h2>
        <p className="text-sm text-gray-600">Select Topic for your video</p>

        <Tabs
          value={activeTab}
          onValueChange={(value) => {
            setActiveTab(value);
            setSelectedTopic("");
            setSelectedScript(null);
            setScripts([]);
            onHandleInputChange("topic", null);
            onHandleInputChange("script", null);
          }}
          className="w-full mt-2"
        >
          <TabsList>
            <TabsTrigger value="suggestion">Suggestion</TabsTrigger>
            <TabsTrigger value="your-topic">Your Topic</TabsTrigger>
          </TabsList>

          {/* Suggestion Tab */}
          <TabsContent value="suggestion" className="mt-2 flex flex-wrap gap-2">
            {suggestion?.map((item) => (
              <Button
                key={item}
                variant="outline"
                className={`px-4 py-2 border rounded-lg transition-all ${
                  item === selectedTopic
                    ? "border-blue-600 dark:border-blue-500" // blue border when selected
                    : "border-gray-300 hover:border-blue-400 dark:border-gray-700"
                }`}
                onClick={() => handleTopicChange(item)}
              >
                {item}
              </Button>
            ))}
          </TabsContent>

          {/* Your Topic Tab */}
          <TabsContent value="your-topic">
            <div>
              <h2>Enter your own topic</h2>
              <Textarea
                placeholder="Enter your topic"
                value={selectedTopic}
                onChange={(e) => handleTopicChange(e.target.value)}
              />
            </div>
          </TabsContent>
        </Tabs>

        {/* Script Selection */}
        {/* Scripts */}
        {scripts.length > 0 && (
          <div className="mt-4">
            <h3 className="font-semibold mb-2">Select Script</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 max-h-80 overflow-y-auto">
              {scripts.map((script, idx) => {
                const selected = idx === selectedScript;
                return (
                  <div
                    key={idx}
                    onClick={() => {
                      setSelectedScript(idx);
                      onHandleInputChange("script", script?.context);
                    }}
                    className={`group relative rounded-md transition-all cursor-pointer border-2 ${
                      selected
                        ? "border-blue-600  dark:border-blue-500"
                        : "border-blue-200 hover:border-blue-400 dark:border-blue-700 dark:hover:border-blue-500"
                    }`}
                  >
                    <Textarea
                      value={script.context}
                      readOnly
                      className="resize-none h-28 overflow-y-auto bg-transparent text-gray-700 dark:text-gray-200 scrollbar-hide"
                    />
                  </div>
                );
              })}
            </div>
          </div>
        )}
      </div>

      {/* Generate Script Button */}

      <Button
        className="mt-3"
        size="lg"
        onClick={GenerateScript}
        disabled={loading || !selectedTopic}
        variant={"orange"}
      >
        {loading ? (
          <>
            <Loader2Icon className="animate-spin" />
            Generating...
          </>
        ) : (
          <>
            <SparklesIcon />
            Generate Script
          </>
        )}
      </Button>
    </div>
  );
};

export default Topic;
