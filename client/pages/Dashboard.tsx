import { useAuth } from "@/contexts/AuthContext";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  BarChart,
  Bar,
  LineChart,
  Line,
  RadarChart,
  Radar,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
} from "recharts";
import {
  Trophy,
  Target,
  Zap,
  TrendingUp,
  Calendar,
  Clock,
  Users,
  Edit,
  Download,
} from "lucide-react";
import { useNavigate } from "react-router-dom";

const performanceData = [
  { domain: "SDE", score: 85, average: 75 },
  { domain: "DS", score: 92, average: 78 },
  { domain: "ML", score: 78, average: 70 },
  { domain: "PM", score: 88, average: 82 },
  { domain: "UX", score: 90, average: 80 },
];

const progressData = [
  { week: "Week 1", sessions: 2, score: 75 },
  { week: "Week 2", sessions: 4, score: 82 },
  { week: "Week 3", sessions: 3, score: 79 },
  { week: "Week 4", sessions: 5, score: 87 },
  { week: "Week 5", sessions: 6, score: 91 },
];

const radarData = [
  { metric: "Posture", value: 85 },
  { metric: "Eye Contact", value: 78 },
  { metric: "Speech", value: 92 },
  { metric: "Confidence", value: 88 },
  { metric: "Pace", value: 81 },
];

const domainStats = [
  { name: "Software Dev", value: 35, color: "#3B82F6" },
  { name: "Data Science", value: 25, color: "#10B981" },
  { name: "Product Mgmt", value: 20, color: "#F59E0B" },
  { name: "Others", value: 20, color: "#8B5CF6" },
];

export default function Dashboard() {
  const { user } = useAuth();
  const navigate = useNavigate();

  const stats = user?.statistics || {
    totalSessions: 0,
    averageScore: 0,
    currentStreak: 0,
    bestStreak: 0,
    experiencePoints: 0,
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 pt-24">
      <div className="max-w-7xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
          <div>
            <h1 className="text-4xl font-bold text-slate-900">
              Welcome back, {user?.firstName}! 👋
            </h1>
            <p className="text-slate-600 mt-2">
              Track your progress and improve your interview skills
            </p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline">
              <Download className="w-4 h-4 mr-2" />
              Export Report
            </Button>
            <Button
              onClick={() => navigate("/interview")}
              className="bg-gradient-to-r from-blue-600 to-purple-600"
            >
              Start Practice
            </Button>
          </div>
        </div>

        {/* Key Stats */}
        <div className="grid md:grid-cols-2 lg:grid-cols-5 gap-4">
          <Card className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 text-sm font-medium">
                Total Sessions
              </span>
              <Clock className="w-4 h-4 text-blue-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900">
              {stats.totalSessions}
            </div>
            <p className="text-xs text-slate-500">
              {Math.max(0, Math.random() * 20).toFixed(0)} this week
            </p>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 text-sm font-medium">
                Average Score
              </span>
              <TrendingUp className="w-4 h-4 text-green-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900">
              {stats.averageScore}%
            </div>
            <p className="text-xs text-green-600">+5% from last month</p>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 text-sm font-medium">
                Current Streak
              </span>
              <Zap className="w-4 h-4 text-yellow-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900">
              {stats.currentStreak}
            </div>
            <p className="text-xs text-slate-500">days in a row</p>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 text-sm font-medium">
                Best Streak
              </span>
              <Trophy className="w-4 h-4 text-purple-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900">
              {stats.bestStreak}
            </div>
            <p className="text-xs text-slate-500">all-time record</p>
          </Card>

          <Card className="p-6 space-y-2">
            <div className="flex items-center justify-between">
              <span className="text-slate-600 text-sm font-medium">
                Experience
              </span>
              <Target className="w-4 h-4 text-orange-600" />
            </div>
            <div className="text-3xl font-bold text-slate-900">
              {stats.experiencePoints}
            </div>
            <p className="text-xs text-slate-500">XP earned</p>
          </Card>
        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-6">
          {/* Domain Performance */}
          <Card className="p-6 space-y-4">
            <h3 className="font-bold text-lg text-slate-900">
              Domain Performance
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <BarChart data={performanceData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="domain" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="score" fill="#3B82F6" name="Your Score" />
                <Bar dataKey="average" fill="#E5E7EB" name="Average" />
              </BarChart>
            </ResponsiveContainer>
          </Card>

          {/* Weekly Progress */}
          <Card className="p-6 space-y-4">
            <h3 className="font-bold text-lg text-slate-900">
              Weekly Progress
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <LineChart data={progressData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="week" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="score"
                  stroke="#3B82F6"
                  name="Score"
                />
                <Line
                  type="monotone"
                  dataKey="sessions"
                  stroke="#10B981"
                  name="Sessions"
                  yAxisId="right"
                />
              </LineChart>
            </ResponsiveContainer>
          </Card>

          {/* Performance Metrics */}
          <Card className="p-6 space-y-4">
            <h3 className="font-bold text-lg text-slate-900">
              Performance Metrics
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <RadarChart data={radarData}>
                <PolarGrid />
                <PolarAngleAxis dataKey="metric" />
                <PolarRadiusAxis />
                <Radar
                  name="Performance"
                  dataKey="value"
                  stroke="#3B82F6"
                  fill="#3B82F6"
                  fillOpacity={0.6}
                />
                <Tooltip />
              </RadarChart>
            </ResponsiveContainer>
          </Card>

          {/* Domain Distribution */}
          <Card className="p-6 space-y-4">
            <h3 className="font-bold text-lg text-slate-900">
              Domain Distribution
            </h3>
            <ResponsiveContainer width="100%" height={300}>
              <PieChart>
                <Pie
                  data={domainStats}
                  cx="50%"
                  cy="50%"
                  labelLine={false}
                  label={({ name, value }) => `${name}: ${value}`}
                  outerRadius={100}
                  fill="#8884d8"
                  dataKey="value"
                >
                  {domainStats.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip />
              </PieChart>
            </ResponsiveContainer>
          </Card>
        </div>

        {/* Recent Achievements */}
        <Card className="p-6 space-y-4">
          <h3 className="font-bold text-lg text-slate-900">Achievements</h3>
          <div className="grid md:grid-cols-4 gap-4">
            <div className="p-4 rounded-lg bg-yellow-50 border border-yellow-200 text-center">
              <div className="text-3xl mb-2">🏆</div>
              <h4 className="font-bold text-yellow-900">First Steps</h4>
              <p className="text-xs text-yellow-800">Completed 1 session</p>
            </div>

            <div className="p-4 rounded-lg bg-purple-50 border border-purple-200 text-center">
              <div className="text-3xl mb-2">⚡</div>
              <h4 className="font-bold text-purple-900">On Fire</h4>
              <p className="text-xs text-purple-800">5-day streak</p>
            </div>

            <div className="p-4 rounded-lg bg-blue-50 border border-blue-200 text-center">
              <div className="text-3xl mb-2">🎯</div>
              <h4 className="font-bold text-blue-900">Focused</h4>
              <p className="text-xs text-blue-800">10 sessions in a week</p>
            </div>

            <div className="p-4 rounded-lg bg-green-50 border border-green-200 text-center">
              <div className="text-3xl mb-2">🌟</div>
              <h4 className="font-bold text-green-900">Excellent</h4>
              <p className="text-xs text-green-800">Score above 90%</p>
            </div>
          </div>
        </Card>

        {/* Quick Actions */}
        <Card className="p-6 space-y-4">
          <h3 className="font-bold text-lg text-slate-900">Quick Actions</h3>
          <div className="grid md:grid-cols-3 gap-4">
            <Button
              onClick={() => navigate("/interview")}
              className="bg-gradient-to-r from-blue-600 to-purple-600"
            >
              <Zap className="w-4 h-4 mr-2" />
              Practice Interview
            </Button>
            <Button onClick={() => navigate("/mcq")} variant="outline">
              <Target className="w-4 h-4 mr-2" />
              MCQ Practice
            </Button>
            <Button variant="outline">
              <Edit className="w-4 h-4 mr-2" />
              Update Profile
            </Button>
          </div>
        </Card>
      </div>
    </div>
  );
}
