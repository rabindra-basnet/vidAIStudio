"use client"
import { Input } from '@/components/ui/input'
import React, { useState } from 'react'
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Button } from '@/components/ui/button'

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
  "Motivational Stories"
]

const Topic = () => {
  const [selectedTopic, setSelectedTopic] = useState(null)
  return (
    <div>
      <h2 className='mb-1'>Project Title</h2>
      <Input placeholder="Enter your project title" />
      <div className='mt-5'>
        <h2>Vidoe Topic</h2>
        <p className='text-sm text-gray-600'>Select Topic for your video</p>
        <Tabs defaultValue="suggestion" className="w-full mt-2">
          <TabsList>
            <TabsTrigger value="suggestion">Suggestion</TabsTrigger>
            <TabsTrigger value="your-topic">Your Topic</TabsTrigger>
          </TabsList>
          <TabsContent value="suggestion">
            <div >
              {suggestion.map((suggestion, index) => (
                <Button variant="outline" className={`m-1 ${suggestion == selectedTopic && 'bg-secondary'}`} key={index}
                  onClick={() => setSelectedTopic(suggestion)}>{suggestion}</Button>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="your-topic">Change your password here.</TabsContent>
        </Tabs>
      </div>
    </div>
  )
}

export default Topic