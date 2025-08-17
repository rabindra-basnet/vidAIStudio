export function GalleryShowcase() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">See What VidAIStudio AI Can Create</h2>
          <p className="text-xl text-gray-600">
            Explore diverse video categories and styles powered by our advanced AI technology
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          <div className="space-y-4">
            <div className="relative group cursor-pointer">
              <img src="/social-media-video.png" alt="Social Media" className="w-full h-48 object-cover rounded-lg" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">Social Media</span>
              </div>
            </div>
            <div className="relative group cursor-pointer">
              <img src="/marketing-video-content.png" alt="Marketing" className="w-full h-48 object-cover rounded-lg" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">Marketing</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative group cursor-pointer">
              <img
                src="/explainer-video-animation.png"
                alt="Explainer Videos"
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">Explainer Videos</span>
              </div>
            </div>
            <div className="relative group cursor-pointer">
              <img
                src="/educational-video-content.png"
                alt="Educational"
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">Educational</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative group cursor-pointer">
              <img src="/product-demo-video.png" alt="Product Demos" className="w-full h-48 object-cover rounded-lg" />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">Product Demos</span>
              </div>
            </div>
            <div className="relative group cursor-pointer">
              <img
                src="/entertainment-video-content.png"
                alt="Entertainment"
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">Entertainment</span>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative group cursor-pointer">
              <img
                src="/corporate-video-presentation.png"
                alt="Corporate"
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">Corporate</span>
              </div>
            </div>
            <div className="relative group cursor-pointer">
              <img
                src="/advertising-video-content.png"
                alt="Advertising"
                className="w-full h-48 object-cover rounded-lg"
              />
              <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity rounded-lg flex items-center justify-center">
                <span className="text-white font-semibold">Advertising</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
