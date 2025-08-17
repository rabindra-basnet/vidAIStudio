import { Button } from "@/components/ui/button"

export function CTASection() {
  return (
    <section className="py-20 bg-gradient-to-r from-purple-600 to-blue-600">
      <div className="max-w-4xl mx-auto text-center px-4 sm:px-6 lg:px-8">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">Ready to Bring Your Stories to Life?</h2>
        <p className="text-xl text-white/90 mb-8 max-w-2xl mx-auto">
          Join thousands of creators who are already transforming their ideas into stunning videos with VidAIStudio AI.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-[#EFB034] text-[#5D4108] shadow-xs hover:bg-[#D29211] hover:active:bg-[#B57E0F] disabled:opacity-40 focus-visible:ring-[#EFB034]/20 dark:focus-visible:ring-[#EFB034]/40 text-lg px-8 py-3"
          >
            Start Creating Now
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white/30 text-white hover:bg-white/10 text-lg px-8 py-3 bg-transparent"
          >
            Watch Demo
          </Button>
        </div>
      </div>
    </section>
  )
}
