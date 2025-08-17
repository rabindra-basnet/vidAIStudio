import { Card, CardContent } from "@/components/ui/card"

export function FAQSection() {
  return (
    <section className="py-20 bg-white">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">Frequently Asked Questions</h2>
          <p className="text-xl text-gray-600">Find quick answers to common questions about VidAIStudio</p>
        </div>

        <div className="space-y-6">
          <Card className="p-6">
            <CardContent className="p-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">How does AI video generation work?</h3>
              <p className="text-gray-600">
                Our advanced neural networks analyze your input and generate high-quality videos using machine learning
                algorithms trained on millions of video samples.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">What video formats are supported?</h3>
              <p className="text-gray-600">
                We support all major video formats including MP4, MOV, AVI, and WebM, with resolutions up to 4K Ultra
                HD.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Can I use my own assets?</h3>
              <p className="text-gray-600">
                Yes! Upload your own images, videos, audio, and brand assets to create personalized content that matches
                your style.
              </p>
            </CardContent>
          </Card>

          <Card className="p-6">
            <CardContent className="p-0">
              <h3 className="text-lg font-semibold text-gray-900 mb-2">Is there a free trial available?</h3>
              <p className="text-gray-600">
                Start with our free Starter plan or try Pro features with our 14-day free trial - no credit card
                required.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
