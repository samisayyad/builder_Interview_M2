import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { useAuth } from "@/contexts/AuthContext";
import { Header } from "@/components/landing/Header";
import { Hero } from "@/components/landing/Hero";
import { Features } from "@/components/landing/Features";
import { Domains } from "@/components/landing/Domains";
import { CTA } from "@/components/landing/CTA";
import { Footer } from "@/components/landing/Footer";
import {
  BarChart3,
  Zap,
  Target,
  Trophy,
  BookOpen,
  Clock,
  ArrowRight,
} from "lucide-react";

export default function Index() {
  const { isAuthenticated, user } = useAuth();
  const navigate = useNavigate();

  // Authenticated user dashboard
  if (isAuthenticated) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 pt-24">
        {/* Hero Section for Authenticated Users */}
        <section className="px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-12 space-y-4">
              <h1 className="text-5xl md:text-6xl font-bold text-slate-900">
                Welcome back, {user?.firstName}! 👋
              </h1>
              <p className="text-xl text-slate-600 max-w-2xl mx-auto">
                Continue your interview preparation journey and improve your
                skills
              </p>
            </div>

            {/* Quick Actions */}
            <div className="grid md:grid-cols-3 gap-6 mb-12">
              <Card className="p-8 space-y-4 hover:shadow-lg transition-all cursor-pointer">
                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                  <Zap className="w-6 h-6 text-blue-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  Start Interview
                </h3>
                <p className="text-slate-600 text-sm">
                  Practice mock interviews with AI feedback
                </p>
                <Button
                  onClick={() => navigate("/interview-select")}
                  className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Start Now
                </Button>
              </Card>

              <Card className="p-8 space-y-4 hover:shadow-lg transition-all cursor-pointer">
                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-green-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">
                  MCQ Practice
                </h3>
                <p className="text-slate-600 text-sm">
                  Test your knowledge with our question bank
                </p>
                <Button
                  onClick={() => navigate("/mcq")}
                  className="w-full"
                  variant="outline"
                >
                  Practice
                </Button>
              </Card>

              <Card className="p-8 space-y-4 hover:shadow-lg transition-all cursor-pointer">
                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                  <BarChart3 className="w-6 h-6 text-purple-600" />
                </div>
                <h3 className="text-xl font-bold text-slate-900">Dashboard</h3>
                <p className="text-slate-600 text-sm">
                  View your progress and analytics
                </p>
                <Button
                  onClick={() => navigate("/dashboard")}
                  className="w-full"
                  variant="outline"
                >
                  View
                </Button>
              </Card>
            </div>

            {/* Stats */}
            <div className="grid md:grid-cols-4 gap-4 mb-12">
              <Card className="p-6 text-center space-y-2">
                <Clock className="w-8 h-8 text-blue-600 mx-auto" />
                <div className="text-3xl font-bold text-slate-900">
                  {user?.statistics?.totalSessions || 0}
                </div>
                <p className="text-sm text-slate-600">Sessions Completed</p>
              </Card>

              <Card className="p-6 text-center space-y-2">
                <Target className="w-8 h-8 text-green-600 mx-auto" />
                <div className="text-3xl font-bold text-slate-900">
                  {user?.statistics?.averageScore || 0}%
                </div>
                <p className="text-sm text-slate-600">Average Score</p>
              </Card>

              <Card className="p-6 text-center space-y-2">
                <Zap className="w-8 h-8 text-yellow-600 mx-auto" />
                <div className="text-3xl font-bold text-slate-900">
                  {user?.statistics?.currentStreak || 0}
                </div>
                <p className="text-sm text-slate-600">Current Streak</p>
              </Card>

              <Card className="p-6 text-center space-y-2">
                <Trophy className="w-8 h-8 text-purple-600 mx-auto" />
                <div className="text-3xl font-bold text-slate-900">
                  {user?.statistics?.experiencePoints || 0}
                </div>
                <p className="text-sm text-slate-600">Experience Points</p>
              </Card>
            </div>

            {/* Recommendation */}
            <Card className="p-8 bg-gradient-to-r from-blue-50 to-purple-50 border-blue-200 space-y-4">
              <h3 className="text-2xl font-bold text-slate-900">
                Next Steps
              </h3>
              <p className="text-slate-700">
                Based on your progress, we recommend focusing on areas where you
                scored below 80%. Try the MCQ practice to strengthen your
                concepts and then attempt a mock interview.
              </p>
              <div className="flex gap-3">
                <Button
                  onClick={() => navigate("/mcq")}
                  className="bg-gradient-to-r from-blue-600 to-purple-600"
                >
                  Continue MCQ Practice
                  <ArrowRight className="w-4 h-4 ml-2" />
                </Button>
                <Button variant="outline">View Study Plan</Button>
              </div>
            </Card>
          </div>
        </section>

        <Footer />
      </div>
    );
  }

  // Unauthenticated user - show landing page
  return (
    <div className="w-full">
      <Header />
      <Hero />
      <Features />
      <Domains />
      <CTA />
      <Footer />
    </div>
  );
}
