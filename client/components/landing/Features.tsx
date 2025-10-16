import { 
  Brain, 
  Zap, 
  BarChart3, 
  Mic, 
  Eye, 
  Award,
  MessageSquare,
  Repeat2
} from "lucide-react";

const features = [
  {
    icon: Brain,
    title: "AI-Powered Analysis",
    description: "Real-time analysis of your performance with advanced AI algorithms"
  },
  {
    icon: Eye,
    title: "Body Language Detection",
    description: "Track posture, eye contact, hand gestures, and overall presence"
  },
  {
    icon: Mic,
    title: "Speech Analysis",
    description: "Clarity, pace, confidence level, and filler word detection"
  },
  {
    icon: BarChart3,
    title: "Performance Analytics",
    description: "Comprehensive reports with detailed metrics and improvements"
  },
  {
    icon: Award,
    title: "Gamification",
    description: "Achievements, streaks, and leaderboards to keep you motivated"
  },
  {
    icon: Repeat2,
    title: "Practice Sessions",
    description: "Unlimited mock interviews across 15+ domains"
  },
  {
    icon: MessageSquare,
    title: "Personalized Feedback",
    description: "AI-generated suggestions for continuous improvement"
  },
  {
    icon: Zap,
    title: "Real-time Insights",
    description: "Get instant feedback during and after your practice session"
  }
];

export function Features() {
  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8 bg-white">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16 space-y-4">
          <h2 className="text-4xl md:text-5xl font-bold text-slate-900">
            Powerful Features for Success
          </h2>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Everything you need to ace your interviews with AI-powered guidance
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="p-6 rounded-xl border border-slate-200 hover:border-blue-300 hover:shadow-lg transition-all duration-300 group"
              >
                <div className="w-12 h-12 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center mb-4 group-hover:from-blue-200 group-hover:to-purple-200 transition">
                  <Icon className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="font-bold text-slate-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-slate-600 text-sm">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
