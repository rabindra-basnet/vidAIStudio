import { Card, CardContent } from "@/components/ui/card"
import { Sparkles, Zap, Shield, Users, Video, Wand2 } from "lucide-react"

export function FeaturesSection() {
  return (
    <section className="py-20 bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Key Features Driving Creativity</h2>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
            Discover the powerful tools that make video creation effortless and inspiring
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          <Card className="p-6 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center mb-4">
                <Sparkles className="w-6 h-6 text-purple-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Neural Video Generation</h3>
              <p className="text-gray-600">
                Advanced AI algorithms create stunning videos from simple text prompts with unprecedented quality.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="w-6 h-6 text-blue-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Advanced Style Transfer</h3>
              <p className="text-gray-600">
                Apply artistic styles and visual effects to transform your videos with professional-grade results.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center mb-4">
                <Wand2 className="w-6 h-6 text-green-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">AI Animation & Transition</h3>
              <p className="text-gray-600">
                Seamless animations and transitions powered by machine learning for smooth, professional videos.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-orange-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="w-6 h-6 text-orange-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Enterprise-Grade Security</h3>
              <p className="text-gray-600">
                Bank-level security with end-to-end encryption to protect your creative assets and data.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-pink-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-6 h-6 text-pink-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Collaborative Video Editor</h3>
              <p className="text-gray-600">
                Real-time collaboration tools that let teams work together seamlessly on video projects.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6 hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <div className="w-12 h-12 bg-indigo-100 rounded-lg flex items-center justify-center mb-4">
                <Video className="w-6 h-6 text-indigo-600" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">Multi-Platform Export</h3>
              <p className="text-gray-600">
                Export optimized videos for any platform - social media, web, mobile, or broadcast quality.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
