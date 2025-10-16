import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import {
  Mic,
  MicOff,
  Video,
  VideoOff,
  RotateCcw,
  Send,
  Clock,
  BarChart3,
  AlertCircle,
} from "lucide-react";

interface Question {
  id: string;
  text: string;
  followUp?: string;
}

const questions: Question[] = [
  {
    id: "1",
    text: "Tell me about yourself and your background.",
    followUp: "What is your greatest strength?",
  },
  {
    id: "2",
    text: "Describe a challenging project you've worked on.",
    followUp: "How did you overcome the challenges?",
  },
  {
    id: "3",
    text: "Why are you interested in this position?",
    followUp: "How do you see yourself growing in this role?",
  },
];

export default function Interview() {
  const [isRecording, setIsRecording] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [sessionFeedback, setSessionFeedback] = useState<
    Array<{ metric: string; score: number }>
  >([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const currentQuestion = questions[currentQuestionIndex];

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setTimeElapsed((t) => t + 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  useEffect(() => {
    if (isCameraOn && !streamRef.current) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: true })
        .then((stream) => {
          streamRef.current = stream;
          if (videoRef.current) {
            videoRef.current.srcObject = stream;
          }
        })
        .catch(() => setIsCameraOn(false));
    } else if (!isCameraOn && streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
  }, [isCameraOn]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    } else {
      handleCompleteSession();
    }
  };

  const handleCompleteSession = () => {
    // Generate mock feedback
    setSessionFeedback([
      { metric: "Posture", score: 85 },
      { metric: "Eye Contact", score: 78 },
      { metric: "Speech Clarity", score: 92 },
      { metric: "Confidence", score: 88 },
      { metric: "Pace", score: 81 },
    ]);
    setIsRecording(false);
  };

  if (sessionFeedback.length > 0) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 pt-24">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Session Complete!
              </h1>
              <p className="text-slate-600">
                Great job! Here's your performance analysis
              </p>
            </div>

            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-blue-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-blue-600">
                    {Math.round(
                      sessionFeedback.reduce((sum, f) => sum + f.score, 0) /
                        sessionFeedback.length
                    )}
                  </div>
                  <div className="text-sm text-slate-600">Overall Score</div>
                </div>
                <div className="bg-purple-50 p-4 rounded-lg text-center">
                  <div className="text-3xl font-bold text-purple-600">
                    {formatTime(timeElapsed)}
                  </div>
                  <div className="text-sm text-slate-600">Duration</div>
                </div>
              </div>

              <div className="space-y-4">
                <h3 className="font-bold text-lg text-slate-900">
                  Performance Breakdown
                </h3>
                {sessionFeedback.map((item, idx) => (
                  <div key={idx} className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-sm font-medium text-slate-700">
                        {item.metric}
                      </span>
                      <span className="text-sm font-bold text-slate-900">
                        {item.score}%
                      </span>
                    </div>
                    <Progress value={item.score} className="h-2" />
                  </div>
                ))}
              </div>

              <div className="bg-green-50 border border-green-200 p-4 rounded-lg">
                <h3 className="font-bold text-green-900 mb-2">
                  ✨ Personalized Recommendations
                </h3>
                <ul className="text-sm text-green-800 space-y-1">
                  <li>
                    • Maintain more consistent eye contact with the camera
                  </li>
                  <li>• Reduce filler words like "um" and "uh"</li>
                  <li>• Speak more slowly and deliberately</li>
                  <li>• Practice your body language for better posture</li>
                </ul>
              </div>

              <div className="flex gap-4 pt-4">
                <Button
                  onClick={() => {
                    setCurrentQuestionIndex(0);
                    setTimeElapsed(0);
                    setSessionFeedback([]);
                    setIsRecording(false);
                  }}
                  className="flex-1"
                >
                  Practice Again
                </Button>
                <Button variant="outline" className="flex-1">
                  Save Results
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 pt-24">
      <div className="max-w-5xl mx-auto">
        <div className="grid lg:grid-cols-3 gap-6">
          {/* Video Feed */}
          <div className="lg:col-span-2 space-y-6">
            <Card className="overflow-hidden bg-black">
              {isCameraOn ? (
                <video
                  ref={videoRef}
                  autoPlay
                  playsInline
                  className="w-full aspect-video object-cover"
                />
              ) : (
                <div className="w-full aspect-video bg-slate-900 flex items-center justify-center">
                  <VideoOff className="w-12 h-12 text-slate-600" />
                </div>
              )}
              {isRecording && (
                <div className="absolute top-4 left-4 flex items-center gap-2 bg-red-500/90 text-white px-3 py-2 rounded-lg">
                  <div className="w-2 h-2 bg-white rounded-full animate-pulse" />
                  <span className="text-sm font-semibold">
                    RECORDING {formatTime(timeElapsed)}
                  </span>
                </div>
              )}
            </Card>

            {/* Controls */}
            <div className="flex gap-3 justify-center">
              <Button
                onClick={() => setIsMicOn(!isMicOn)}
                variant={isMicOn ? "default" : "destructive"}
                size="lg"
                className="w-12 h-12 p-0"
              >
                {isMicOn ? (
                  <Mic className="w-5 h-5" />
                ) : (
                  <MicOff className="w-5 h-5" />
                )}
              </Button>
              <Button
                onClick={() => setIsCameraOn(!isCameraOn)}
                variant={isCameraOn ? "default" : "destructive"}
                size="lg"
                className="w-12 h-12 p-0"
              >
                {isCameraOn ? (
                  <Video className="w-5 h-5" />
                ) : (
                  <VideoOff className="w-5 h-5" />
                )}
              </Button>
              <Button
                onClick={() => setIsRecording(!isRecording)}
                className={`flex-1 h-12 ${
                  isRecording
                    ? "bg-red-500 hover:bg-red-600"
                    : "bg-green-500 hover:bg-green-600"
                }`}
              >
                {isRecording ? "Stop Recording" : "Start Recording"}
              </Button>
            </div>

            {/* Question Display */}
            <Card className="p-6 space-y-4">
              <div className="flex items-center justify-between">
                <Badge variant="outline">
                  Question {currentQuestionIndex + 1} of {questions.length}
                </Badge>
                <span className="text-sm text-slate-600 flex items-center gap-1">
                  <Clock className="w-4 h-4" />
                  {formatTime(timeElapsed)}
                </span>
              </div>

              <div className="space-y-3">
                <h3 className="text-xl font-bold text-slate-900">
                  {currentQuestion.text}
                </h3>
                {currentQuestion.followUp && (
                  <p className="text-slate-600 text-sm">
                    Follow-up: {currentQuestion.followUp}
                  </p>
                )}
              </div>

              <Progress
                value={(currentQuestionIndex / questions.length) * 100}
                className="h-2"
              />
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Real-time Metrics */}
            <Card className="p-4 space-y-3">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <BarChart3 className="w-4 h-4" />
                Live Metrics
              </h3>
              <div className="space-y-2">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Posture</span>
                  <Badge variant="outline" className="bg-green-50">
                    92%
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Eye Contact</span>
                  <Badge variant="outline" className="bg-blue-50">
                    78%
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Clarity</span>
                  <Badge variant="outline" className="bg-purple-50">
                    85%
                  </Badge>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-600">Confidence</span>
                  <Badge variant="outline" className="bg-pink-50">
                    88%
                  </Badge>
                </div>
              </div>
            </Card>

            {/* Tips */}
            <Card className="p-4 bg-blue-50 border-blue-200 space-y-3">
              <h3 className="font-bold text-blue-900 flex items-center gap-2">
                <AlertCircle className="w-4 h-4" />
                Tips
              </h3>
              <ul className="text-xs text-blue-800 space-y-2">
                <li>• Maintain eye contact with camera</li>
                <li>• Speak clearly and at a steady pace</li>
                <li>• Keep a good posture</li>
                <li>• Avoid filler words</li>
              </ul>
            </Card>

            {/* Navigation */}
            <div className="space-y-3">
              <Button
                onClick={handleNextQuestion}
                className="w-full"
                disabled={!isRecording}
              >
                {currentQuestionIndex === questions.length - 1
                  ? "Complete Session"
                  : "Next Question"}
              </Button>
              <Button variant="outline" className="w-full">
                <RotateCcw className="w-4 h-4 mr-2" />
                Reset
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
