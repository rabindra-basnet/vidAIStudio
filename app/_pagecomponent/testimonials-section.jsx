import { Card, CardContent } from "@/components/ui/card"

export function TestimonialsSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">What Our Users Are Saying</h2>
          <p className="text-xl text-gray-600">Join thousands of creators who trust VidAIStudio</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          <Card className="p-6">
            <CardContent className="p-0">
              <div className="flex items-center mb-4">
                <img src="/professional-headshot.png" alt="User" className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-900">Sarah Chen</h4>
                  <p className="text-sm text-gray-600">Marketing Director</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "VidAIStudio transformed our content strategy. We create professional videos in minutes that used to
                take days."
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <div className="flex items-center mb-4">
                <img src="/creative-professional-headshot.png" alt="User" className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-900">Marcus Rivera</h4>
                  <p className="text-sm text-gray-600">Content Creator</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "The AI understands exactly what I want. It's like having a professional video team at my fingertips."
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <div className="flex items-center mb-4">
                <img src="/professional-headshot.png" alt="User" className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-900">Emily Watson</h4>
                  <p className="text-sm text-gray-600">Startup Founder</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "Game-changer for our startup. We can compete with big brands on video content without the budget."
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <div className="flex items-center mb-4">
                <img src="/placeholder-0crfy.png" alt="User" className="w-10 h-10 rounded-full mr-3" />
                <div>
                  <h4 className="font-semibold text-gray-900">David Park</h4>
                  <p className="text-sm text-gray-600">Educator</p>
                </div>
              </div>
              <p className="text-gray-600 text-sm">
                "My students love the engaging videos I create. VidAIStudio makes complex topics visually compelling."
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
