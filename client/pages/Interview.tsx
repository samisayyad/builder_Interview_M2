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
  Volume2,
} from "lucide-react";
import { useLocation, useNavigate } from "react-router-dom";
import { INTERVIEW_DOMAINS } from "@/constants";

interface Question {
  id: string;
  text: string;
  followUp?: string;
  domain?: string;
}

interface InterviewResult {
  domain: string;
  difficulty: string;
  questions: Array<{
    question: string;
    transcript: string;
    duration: number;
    scores: {
      posture: number;
      eyeContact: number;
      clarity: number;
      confidence: number;
      pace: number;
    };
  }>;
  overallScore: number;
  timeElapsed: number;
}

const domainQuestions: Record<string, Question[]> = {
  sde: [
    {
      id: "1",
      text: "Tell me about yourself and your software development experience.",
      followUp: "What's your favorite programming language and why?",
      domain: "sde",
    },
    {
      id: "2",
      text: "Describe a challenging technical problem you solved recently.",
      followUp: "How did you approach debugging and what was the solution?",
      domain: "sde",
    },
    {
      id: "3",
      text: "What design patterns are you familiar with?",
      followUp: "Can you give an example of when you used one?",
      domain: "sde",
    },
  ],
  ds: [
    {
      id: "1",
      text: "Tell me about your data science background and key projects.",
      followUp: "What was the most impactful insight you derived from data?",
      domain: "ds",
    },
    {
      id: "2",
      text: "Explain how you would approach building a predictive model.",
      followUp: "How do you evaluate and validate your model?",
      domain: "ds",
    },
    {
      id: "3",
      text: "Describe your experience with data visualization.",
      followUp: "How do you communicate findings to non-technical stakeholders?",
      domain: "ds",
    },
  ],
  ml: [
    {
      id: "1",
      text: "Tell me about your machine learning experience and key projects.",
      followUp: "What was your biggest learning from a failed ML project?",
      domain: "ml",
    },
    {
      id: "2",
      text: "Explain the difference between supervised and unsupervised learning.",
      followUp: "Can you provide real-world examples for each?",
      domain: "ml",
    },
    {
      id: "3",
      text: "How do you handle overfitting in your models?",
      followUp: "What techniques do you commonly use?",
      domain: "ml",
    },
  ],
  pm: [
    {
      id: "1",
      text: "Tell me about your product management background.",
      followUp: "What was your most successful product launch?",
      domain: "pm",
    },
    {
      id: "2",
      text: "How do you approach identifying and prioritizing features?",
      followUp: "Can you walk me through your prioritization framework?",
      domain: "pm",
    },
    {
      id: "3",
      text: "Describe how you work with engineering and design teams.",
      followUp: "How do you handle disagreements?",
      domain: "pm",
    },
  ],
  ux: [
    {
      id: "1",
      text: "Tell me about your UX design experience and philosophy.",
      followUp: "What's the most important principle in your design process?",
      domain: "ux",
    },
    {
      id: "2",
      text: "Walk me through your design process for a complex feature.",
      followUp: "How do you validate your design decisions?",
      domain: "ux",
    },
    {
      id: "3",
      text: "How do you balance creativity with data-driven design?",
      followUp: "Can you give an example?",
      domain: "ux",
    },
  ],
};

export default function Interview() {
  const location = useLocation();
  const navigate = useNavigate();
  const state = location.state as {
    selectedDomain: string;
    selectedDifficulty: string;
  };

  if (!state?.selectedDomain) {
    navigate("/interview-select");
    return null;
  }

  const [isRecording, setIsRecording] = useState(false);
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [isMicOn, setIsMicOn] = useState(true);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [questionStartTime, setQuestionStartTime] = useState(0);
  const [transcript, setTranscript] = useState("");
  const [sessionFeedback, setSessionFeedback] = useState<
    Array<{ metric: string; score: number }>
  >([]);
  const [sessionResults, setSessionResults] = useState<InterviewResult | null>(
    null
  );
  const videoRef = useRef<HTMLVideoElement>(null);
  const streamRef = useRef<MediaStream | null>(null);

  const questions =
    domainQuestions[state.selectedDomain] ||
    domainQuestions.sde;
  const currentQuestion = questions[currentQuestionIndex];
  const selectedDomainName =
    INTERVIEW_DOMAINS.find((d) => d.id === state.selectedDomain)?.name ||
    "Interview";

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
      setTranscript("");
      setQuestionStartTime(Date.now());
    } else {
      handleCompleteSession();
    }
  };

  const handleAddTranscript = (text: string) => {
    setTranscript((prev) => (prev ? prev + " " + text : text));
  };

  const handleCompleteSession = () => {
    // Generate mock feedback with timestamps
    const results: InterviewResult = {
      domain: state.selectedDomain,
      difficulty: state.selectedDifficulty,
      questions: questions.map((q) => ({
        question: q.text,
        transcript:
          "This is a sample transcript of the answer. In a real scenario, this would be the speech-to-text conversion of the user's response during the interview.",
        duration: Math.floor(Math.random() * 120) + 30,
        scores: {
          posture: Math.floor(Math.random() * 20) + 75,
          eyeContact: Math.floor(Math.random() * 20) + 70,
          clarity: Math.floor(Math.random() * 15) + 85,
          confidence: Math.floor(Math.random() * 20) + 75,
          pace: Math.floor(Math.random() * 20) + 75,
        },
      })),
      overallScore: Math.floor(Math.random() * 20) + 80,
      timeElapsed,
    };

    setSessionResults(results);
    setSessionFeedback([
      { metric: "Posture", score: results.questions[0].scores.posture },
      { metric: "Eye Contact", score: results.questions[0].scores.eyeContact },
      { metric: "Speech Clarity", score: results.questions[0].scores.clarity },
      { metric: "Confidence", score: results.questions[0].scores.confidence },
      { metric: "Pace", score: results.questions[0].scores.pace },
    ]);
    setIsRecording(false);
  };

  if (sessionResults) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 pt-24">
        <div className="max-w-4xl mx-auto">
          <Card className="p-8 space-y-8">
            <div className="text-center space-y-2">
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Session Complete! 🎉
              </h1>
              <p className="text-slate-600">
                Great job! Here's your detailed performance analysis
              </p>
            </div>

            {/* Overall Metrics */}
            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-6 rounded-lg text-center border border-blue-200">
                <div className="text-4xl font-bold text-blue-600 mb-2">
                  {sessionResults.overallScore}%
                </div>
                <div className="text-sm text-slate-600">Overall Score</div>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg text-center border border-purple-200">
                <div className="text-4xl font-bold text-purple-600 mb-2">
                  {sessionResults.questions.length}
                </div>
                <div className="text-sm text-slate-600">Questions</div>
              </div>
              <div className="bg-green-50 p-6 rounded-lg text-center border border-green-200">
                <div className="text-4xl font-bold text-green-600 mb-2">
                  {formatTime(sessionResults.timeElapsed)}
                </div>
                <div className="text-sm text-slate-600">Duration</div>
              </div>
            </div>

            {/* Questions & Transcripts */}
            <div className="space-y-6">
              <h3 className="text-2xl font-bold text-slate-900">
                Detailed Feedback
              </h3>
              {sessionResults.questions.map((q, idx) => (
                <Card key={idx} className="p-6 space-y-4 bg-slate-50">
                  <div className="flex items-start justify-between">
                    <div>
                      <h4 className="font-bold text-slate-900">
                        Question {idx + 1}
                      </h4>
                      <p className="text-slate-700 mt-2">{q.question}</p>
                    </div>
                    <Badge className="bg-blue-100 text-blue-800">
                      {q.duration}s
                    </Badge>
                  </div>

                  {/* Transcript */}
                  <div className="bg-white p-4 rounded-lg border border-slate-200">
                    <p className="text-sm font-semibold text-slate-900 mb-2 flex items-center gap-2">
                      <Volume2 className="w-4 h-4" />
                      Your Response
                    </p>
                    <p className="text-slate-700 italic">"{q.transcript}"</p>
                  </div>

                  {/* Scores */}
                  <div className="grid md:grid-cols-5 gap-2">
                    {Object.entries(q.scores).map(([metric, score]) => (
                      <div
                        key={metric}
                        className="bg-white p-3 rounded-lg border border-slate-200"
                      >
                        <div className="text-xs font-semibold text-slate-600 mb-1 capitalize">
                          {metric.replace(/([A-Z])/g, " $1").trim()}
                        </div>
                        <div className="text-xl font-bold text-blue-600">
                          {score}%
                        </div>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>

            {/* Recommendations */}
            <div className="bg-gradient-to-r from-green-50 to-emerald-50 border border-green-200 p-6 rounded-lg">
              <h3 className="font-bold text-green-900 mb-4 text-lg">
                ✨ Personalized Recommendations
              </h3>
              <ul className="text-green-800 space-y-2">
                <li>
                  • Maintain more consistent eye contact with the camera
                </li>
                <li>• Reduce filler words like "um" and "uh"</li>
                <li>• Speak more slowly and deliberately</li>
                <li>• Take a moment to think before answering</li>
                <li>• Practice your body language for better posture</li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 flex-col sm:flex-row">
              <Button
                onClick={() => {
                  setCurrentQuestionIndex(0);
                  setTimeElapsed(0);
                  setSessionResults(null);
                  setTranscript("");
                }}
                className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600"
              >
                Practice Again
              </Button>
              <Button
                onClick={() => navigate("/dashboard")}
                variant="outline"
                className="flex-1"
              >
                Back to Dashboard
              </Button>
            </div>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 pt-24">
      <div className="max-w-5xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-slate-900">
            {selectedDomainName} Interview
          </h1>
          <p className="text-slate-600 capitalize">
            Difficulty: {state.selectedDifficulty} • Progress:{" "}
            {currentQuestionIndex + 1}/{questions.length}
          </p>
        </div>

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
