import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CTA() {
  const navigate = useNavigate();

  return (
    <section className="py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-r from-blue-600 via-purple-600 to-pink-600">
      <div className="max-w-4xl mx-auto text-center space-y-8">
        <div className="space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-white">
            Ready to Ace Your Interviews?
          </h2>
          <p className="text-xl text-blue-100 max-w-2xl mx-auto">
            Join thousands of professionals who've mastered their interview skills with Intervi
          </p>
        </div>

        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            size="lg"
            className="bg-white text-blue-600 hover:bg-blue-50 font-bold group"
            onClick={() => navigate("/interview")}
          >
            Start Your First Practice
            <ArrowRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition" />
          </Button>
          <Button
            size="lg"
            variant="outline"
            className="border-white text-white hover:bg-white/10 font-bold"
            onClick={() => navigate("/mcq")}
          >
            Try MCQ Questions
          </Button>
        </div>

        <div className="grid md:grid-cols-3 gap-8 pt-8 text-white/80">
          <div>
            <div className="text-3xl font-bold text-white mb-2">50K+</div>
            <p className="text-sm">Active Users</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">4.9★</div>
            <p className="text-sm">Average Rating</p>
          </div>
          <div>
            <div className="text-3xl font-bold text-white mb-2">10M+</div>
            <p className="text-sm">Interview Sessions</p>
          </div>
        </div>
      </div>
    </section>
  );
}
