import { Button } from "@/components/ui/button";
import { ArrowRight, Play } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function Hero() {
  const navigate = useNavigate();

  return (
    <section className="pt-32 pb-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-slate-50 via-blue-50 to-purple-50">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div className="space-y-4">
              <div className="inline-block px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-semibold">
                ✨ AI-Powered Interview Practice
              </div>
              <h1 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600 bg-clip-text text-transparent leading-tight">
                Master Your Interview Skills
              </h1>
              <p className="text-xl text-slate-600 leading-relaxed">
                Practice with AI-powered mock interviews, get real-time feedback on your body language, speech clarity, and confidence. Ace your dream job.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row gap-4 pt-4">
              <Button
                size="lg"
                className="bg-gradient-to-r from-blue-600 to-purple-600 text-white rounded-lg group"
                onClick={() => navigate("/interview")}
              >
                Start Practicing Now
                <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition" />
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="rounded-lg"
                onClick={() => navigate("/mcq")}
              >
                <Play className="w-5 h-5 mr-2" />
                MCQ Practice
              </Button>
            </div>

            <div className="flex gap-8 text-sm">
              <div>
                <div className="font-bold text-2xl text-slate-900">1000+</div>
                <div className="text-slate-600">Questions</div>
              </div>
              <div>
                <div className="font-bold text-2xl text-slate-900">15+</div>
                <div className="text-slate-600">Interview Domains</div>
              </div>
              <div>
                <div className="font-bold text-2xl text-slate-900">AI</div>
                <div className="text-slate-600">Feedback</div>
              </div>
            </div>
          </div>

          <div className="hidden md:block relative">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 rounded-3xl blur-3xl opacity-20"></div>
            <div className="relative bg-white rounded-3xl p-8 shadow-2xl">
              <div className="aspect-video bg-gradient-to-br from-slate-100 to-slate-200 rounded-2xl flex items-center justify-center">
                <div className="text-center">
                  <div className="w-16 h-16 mx-auto bg-gradient-to-r from-blue-600 to-purple-600 rounded-full flex items-center justify-center mb-4">
                    <Play className="w-8 h-8 text-white fill-white" />
                  </div>
                  <p className="text-slate-600 font-medium">AI Interview in Action</p>
                </div>
              </div>
              <div className="mt-6 grid grid-cols-3 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="font-bold text-blue-600">Posture</div>
                  <div className="text-sm text-slate-600">92%</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="font-bold text-purple-600">Speech</div>
                  <div className="text-sm text-slate-600">88%</div>
                </div>
                <div className="bg-pink-50 p-4 rounded-lg text-center">
                  <div className="font-bold text-pink-600">Confidence</div>
                  <div className="text-sm text-slate-600">95%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
