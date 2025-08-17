export function ProcessSteps() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Simple Steps to Stunning Videos</h2>
          <p className="text-xl text-gray-600">Create professional videos in just three easy steps</p>
        </div>

        <div className="space-y-16">
          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  1
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Input Your Ideas</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Simply type your concept, upload reference materials, or describe your vision. Our AI understands
                natural language and creative briefs.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gray-900 rounded-lg p-4 aspect-video flex items-center justify-center">
                <img
                  src="/video-editing-interface-text.png"
                  alt="Input interface"
                  className="rounded-lg w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row-reverse items-center gap-12">
            <div className="lg:w-1/2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  2
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Generate & Customize</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Watch as our AI generates your video in real-time. Fine-tune styles, adjust timing, and customize every
                element to match your vision perfectly.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg p-4 aspect-video flex items-center justify-center">
                <img
                  src="/ai-video-generation-process.png"
                  alt="Generation interface"
                  className="rounded-lg w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          <div className="flex flex-col lg:flex-row items-center gap-12">
            <div className="lg:w-1/2">
              <div className="flex items-center mb-4">
                <div className="w-10 h-10 bg-purple-600 text-white rounded-full flex items-center justify-center font-bold text-lg mr-4">
                  3
                </div>
                <h3 className="text-2xl font-bold text-gray-900">Share Your Creation</h3>
              </div>
              <p className="text-gray-600 text-lg leading-relaxed">
                Export in any format you need and share directly to social platforms, or download for further editing.
                Your masterpiece is ready to inspire the world.
              </p>
            </div>
            <div className="lg:w-1/2">
              <div className="bg-gray-100 rounded-lg p-4 aspect-video flex items-center justify-center">
                <img
                  src="/shared-video-mobile.png"
                  alt="Share interface"
                  className="rounded-lg w-full h-full object-cover"
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
