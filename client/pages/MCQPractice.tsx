import { useState, useEffect, useMemo } from "react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Alert, AlertDescription } from "@/components/ui/alert";
import {
  CheckCircle,
  XCircle,
  SkipForward,
  RotateCcw,
  BookOpen,
  Clock,
  Trophy,
  Filter,
} from "lucide-react";
import { INTERVIEW_DOMAINS, DIFFICULTY_LEVELS } from "@/constants";
import { mcqQuestions, MCQQuestion } from "@/data/mcq-questions";

interface Answer {
  questionId: string;
  selectedOption: string;
  isCorrect: boolean;
  timeSpent: number;
}

interface MCQSession {
  domain: string;
  difficulty: string;
}

export default function MCQPractice() {
  const [sessionStarted, setSessionStarted] = useState(false);
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] = useState<string>("intermediate");
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string>("");
  const [answers, setAnswers] = useState<Answer[]>([]);
  const [showExplanation, setShowExplanation] = useState(false);
  const [sessionComplete, setSessionComplete] = useState(false);
  const [timeElapsed, setTimeElapsed] = useState(0);
  const [startTime, setStartTime] = useState<number>(0);

  const sessionQuestions = useMemo(() => {
    if (!selectedDomain) return [];
    return mcqQuestions.filter(
      (q) =>
        q.domain === INTERVIEW_DOMAINS.find((d) => d.id === selectedDomain)
          ?.name && q.difficulty === selectedDifficulty
    );
  }, [selectedDomain, selectedDifficulty]);

  const currentQuestion = sessionQuestions[currentQuestionIndex];
  const answeredCount = answers.length;
  const correctCount = answers.filter((a) => a.isCorrect).length;

  useEffect(() => {
    const interval = setInterval(() => {
      setTimeElapsed((t) => t + 1);
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    setStartTime(Date.now());
  }, [currentQuestionIndex]);

  const handleSelectOption = (value: string) => {
    if (!showExplanation) {
      setSelectedOption(value);
    }
  };

  const handleSubmitAnswer = () => {
    if (!selectedOption) return;

    const isCorrect = selectedOption === currentQuestion.correctOption;
    const timeSpent = Math.round((Date.now() - startTime) / 1000);

    setAnswers([
      ...answers,
      {
        questionId: currentQuestion.id,
        selectedOption,
        isCorrect,
        timeSpent,
      },
    ]);

    setShowExplanation(true);
  };

  const handleNext = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption("");
      setShowExplanation(false);
    } else {
      setSessionComplete(true);
    }
  };

  const handleSkip = () => {
    if (currentQuestionIndex < sampleQuestions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      setSelectedOption("");
      setShowExplanation(false);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, "0")}:${secs.toString().padStart(2, "0")}`;
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "beginner":
        return "bg-green-100 text-green-800";
      case "intermediate":
        return "bg-blue-100 text-blue-800";
      case "advanced":
        return "bg-red-100 text-red-800";
      default:
        return "bg-gray-100 text-gray-800";
    }
  };

  const handleStartSession = () => {
    if (selectedDomain) {
      setSessionStarted(true);
      setCurrentQuestionIndex(0);
      setAnswers([]);
      setStartTime(Date.now());
    }
  };

  // Session selection screen
  if (!sessionStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 pt-24">
        <div className="max-w-5xl mx-auto">
          <div className="text-center mb-12 space-y-3">
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
              MCQ Practice
            </h1>
            <p className="text-lg text-slate-600">
              Select a domain and difficulty to start practicing
            </p>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Domain Selection */}
            <div className="lg:col-span-2">
              <Card className="p-6 space-y-4">
                <h2 className="text-xl font-bold text-slate-900 flex items-center gap-2">
                  <Filter className="w-5 h-5" />
                  Select Domain
                </h2>
                <div className="grid md:grid-cols-2 gap-4">
                  {INTERVIEW_DOMAINS.map((domain) => (
                    <button
                      key={domain.id}
                      onClick={() => setSelectedDomain(domain.id)}
                      className={`p-4 rounded-lg border-2 transition-all text-left ${
                        selectedDomain === domain.id
                          ? "border-blue-400 bg-blue-50"
                          : "border-slate-200 hover:border-blue-300"
                      }`}
                    >
                      <h3 className="font-bold text-slate-900">
                        {domain.name}
                      </h3>
                      <p className="text-sm text-slate-600">
                        {
                          mcqQuestions.filter(
                            (q) => q.domain === domain.name
                          ).length
                        }{" "}
                        questions
                      </p>
                    </button>
                  ))}
                </div>
              </Card>
            </div>

            {/* Sidebar - Difficulty & Info */}
            <div className="space-y-6">
              <Card className="p-6 space-y-4">
                <h3 className="font-bold text-slate-900">Difficulty</h3>
                <div className="space-y-3">
                  {DIFFICULTY_LEVELS.map((level) => (
                    <button
                      key={level.value}
                      onClick={() => setSelectedDifficulty(level.value)}
                      className={`w-full p-3 rounded-lg border-2 text-left transition-all font-medium ${
                        selectedDifficulty === level.value
                          ? `border-${level.color}-400 bg-${level.color}-50 text-${level.color}-900`
                          : "border-slate-200 bg-white text-slate-700"
                      }`}
                    >
                      {level.label}
                    </button>
                  ))}
                </div>
              </Card>

              {selectedDomain && (
                <Card className="p-6 space-y-4 bg-gradient-to-br from-blue-50 to-purple-50">
                  <h3 className="font-bold text-slate-900">Ready?</h3>
                  <div className="space-y-2 text-sm text-slate-700">
                    <p>
                      • Domain:{" "}
                      <span className="font-semibold">
                        {INTERVIEW_DOMAINS.find((d) => d.id === selectedDomain)
                          ?.name}
                      </span>
                    </p>
                    <p>
                      • Difficulty:{" "}
                      <span className="font-semibold capitalize">
                        {selectedDifficulty}
                      </span>
                    </p>
                    <p>
                      • Questions:{" "}
                      <span className="font-semibold">
                        {
                          mcqQuestions.filter(
                            (q) =>
                              q.domain ===
                                INTERVIEW_DOMAINS.find(
                                  (d) => d.id === selectedDomain
                                )?.name &&
                              q.difficulty === selectedDifficulty
                          ).length
                        }
                      </span>
                    </p>
                  </div>
                  <Button
                    onClick={handleStartSession}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                  >
                    Start Practice
                  </Button>
                </Card>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (sessionComplete) {
    const accuracy = Math.round((correctCount / sampleQuestions.length) * 100);

    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 pt-24">
        <div className="max-w-3xl mx-auto">
          <Card className="p-8 text-center space-y-8">
            <div className="flex justify-center">
              <div className="w-24 h-24 bg-gradient-to-br from-green-400 to-blue-500 rounded-full flex items-center justify-center">
                <Trophy className="w-12 h-12 text-white" />
              </div>
            </div>

            <div>
              <h1 className="text-4xl font-bold text-slate-900 mb-2">
                Quiz Complete!
              </h1>
              <p className="text-slate-600">
                Great job on completing the MCQ practice session
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="bg-blue-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-1">
                  {accuracy}%
                </div>
                <div className="text-sm text-slate-600">Accuracy</div>
              </div>
              <div className="bg-green-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-green-600 mb-1">
                  {correctCount}/{sampleQuestions.length}
                </div>
                <div className="text-sm text-slate-600">Correct Answers</div>
              </div>
              <div className="bg-purple-50 p-6 rounded-lg">
                <div className="text-3xl font-bold text-purple-600 mb-1">
                  {formatTime(timeElapsed)}
                </div>
                <div className="text-sm text-slate-600">Time Spent</div>
              </div>
            </div>

            <div className="space-y-3">
              <div>
                <div className="flex justify-between mb-2">
                  <span className="text-sm font-medium text-slate-700">
                    Overall Performance
                  </span>
                  <span className="text-sm font-bold text-slate-900">
                    {accuracy}%
                  </span>
                </div>
                <Progress value={accuracy} className="h-3" />
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 p-4 rounded-lg text-left">
              <h3 className="font-bold text-blue-900 mb-3">
                📊 Performance Analysis
              </h3>
              <ul className="text-sm text-blue-800 space-y-2">
                {accuracy >= 80 && (
                  <li>
                    ✓ Excellent performance! You're well-prepared for this
                    domain.
                  </li>
                )}
                {accuracy >= 60 && accuracy < 80 && (
                  <li>
                    ✓ Good performance! Review the incorrect answers to improve
                    further.
                  </li>
                )}
                {accuracy < 60 && (
                  <li>
                    ✓ There's room for improvement. Focus on the topics where
                    you struggled.
                  </li>
                )}
                <li>
                  • {sampleQuestions.length} questions completed in{" "}
                  {formatTime(timeElapsed)}
                </li>
                <li>
                  • Average time per question:{" "}
                  {formatTime(Math.round(timeElapsed / sampleQuestions.length))}
                </li>
              </ul>
            </div>

            <div className="flex gap-3 flex-col sm:flex-row">
              <Button
                onClick={() => window.location.href = "/mcq"}
                className="flex-1"
              >
                Try Another Set
              </Button>
              <Button
                onClick={() => window.location.href = "/"}
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

  const currentAnswer = answers.find(
    (a) => a.questionId === currentQuestion?.id
  );
  const isAnswered = showExplanation;
  const selectedDomainName = INTERVIEW_DOMAINS.find(
    (d) => d.id === selectedDomain
  )?.name;

  if (!currentQuestion) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 pt-24 flex items-center justify-center">
        <Card className="p-8 text-center">
          <p className="text-slate-600">No questions available</p>
          <Button
            onClick={() => setSessionStarted(false)}
            className="mt-4"
            variant="outline"
          >
            Back
          </Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 pt-24">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="mb-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-slate-900">MCQ Practice</h1>
            <p className="text-slate-600">
              {selectedDomainName} - {currentQuestion.difficulty}
            </p>
          </div>
          <div className="text-right">
            <div className="text-sm text-slate-600 mb-2 flex items-center gap-1">
              <Clock className="w-4 h-4" />
              {formatTime(timeElapsed)}
            </div>
            <Badge className={getDifficultyColor(currentQuestion.difficulty)}>
              {currentQuestion.difficulty}
            </Badge>
          </div>
        </div>

        {/* Progress */}
        <Card className="p-4 mb-6">
          <div className="flex justify-between mb-2">
            <span className="text-sm font-medium text-slate-700">
              Question {currentQuestionIndex + 1} of {sessionQuestions.length}
            </span>
            <span className="text-sm font-medium text-slate-700">
              {answeredCount} Answered
            </span>
          </div>
          <Progress
            value={(currentQuestionIndex / sessionQuestions.length) * 100}
            className="h-2"
          />
        </Card>

        <div className="grid lg:grid-cols-3 gap-6">
          {/* Main Question Area */}
          <div className="lg:col-span-2">
            <Card className="p-8 space-y-8">
              {/* Question */}
              <div className="space-y-4">
                <h2 className="text-2xl font-bold text-slate-900">
                  {currentQuestion.prompt}
                </h2>
              </div>

              {/* Options */}
              <div className="space-y-3">
                <RadioGroup value={selectedOption} onValueChange={handleSelectOption}>
                  {currentQuestion.options.map((option) => {
                    const isSelected = selectedOption === option.value;
                    const isCorrectOption =
                      option.value === currentQuestion.correctOption;
                    const isWrongSelected =
                      isSelected &&
                      option.value !== currentQuestion.correctOption &&
                      showExplanation;

                    return (
                      <div key={option.value} className="relative">
                        <div
                          className={`p-4 rounded-lg border-2 cursor-pointer transition-all ${
                            isAnswered
                              ? isCorrectOption
                                ? "border-green-400 bg-green-50"
                                : isWrongSelected
                                  ? "border-red-400 bg-red-50"
                                  : "border-slate-200 bg-slate-50"
                              : isSelected
                                ? "border-blue-400 bg-blue-50"
                                : "border-slate-200 hover:border-slate-300"
                          }`}
                        >
                          <div className="flex items-center gap-3">
                            <RadioGroupItem
                              value={option.value}
                              id={option.value}
                              disabled={isAnswered}
                            />
                            <Label
                              htmlFor={option.value}
                              className="flex-1 cursor-pointer font-medium"
                            >
                              {option.label}
                            </Label>
                            {isAnswered && isCorrectOption && (
                              <CheckCircle className="w-5 h-5 text-green-600" />
                            )}
                            {isAnswered && isWrongSelected && (
                              <XCircle className="w-5 h-5 text-red-600" />
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </RadioGroup>
              </div>

              {/* Explanation */}
              {showExplanation && (
                <Alert
                  className={
                    currentAnswer?.isCorrect
                      ? "border-green-200 bg-green-50"
                      : "border-red-200 bg-red-50"
                  }
                >
                  <AlertDescription
                    className={
                      currentAnswer?.isCorrect
                        ? "text-green-800"
                        : "text-red-800"
                    }
                  >
                    <div className="space-y-2">
                      <div className="font-bold flex items-center gap-2">
                        {currentAnswer?.isCorrect ? (
                          <>
                            <CheckCircle className="w-5 h-5" />
                            Correct!
                          </>
                        ) : (
                          <>
                            <XCircle className="w-5 h-5" />
                            Incorrect
                          </>
                        )}
                      </div>
                      <p>{currentQuestion.explanation}</p>
                    </div>
                  </AlertDescription>
                </Alert>
              )}

              {/* Buttons */}
              <div className="flex gap-3 flex-col sm:flex-row">
                {!showExplanation ? (
                  <>
                    <Button
                      onClick={handleSubmitAnswer}
                      disabled={!selectedOption}
                      className="flex-1"
                    >
                      Submit Answer
                    </Button>
                    <Button
                      onClick={handleSkip}
                      variant="outline"
                      className="flex-1"
                    >
                      <SkipForward className="w-4 h-4 mr-2" />
                      Skip
                    </Button>
                  </>
                ) : (
                  <>
                    <Button onClick={handleNext} className="flex-1">
                      {currentQuestionIndex === sessionQuestions.length - 1
                        ? "View Results"
                        : "Next Question"}
                    </Button>
                    <Button variant="outline" className="flex-1">
                      <RotateCcw className="w-4 h-4 mr-2" />
                      Review Later
                    </Button>
                  </>
                )}
              </div>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Stats */}
            <Card className="p-4 space-y-4">
              <h3 className="font-bold text-slate-900 flex items-center gap-2">
                <BookOpen className="w-4 h-4" />
                Statistics
              </h3>
              <div className="space-y-3">
                <div>
                  <div className="text-2xl font-bold text-blue-600">
                    {correctCount}
                  </div>
                  <div className="text-xs text-slate-600">Correct Answers</div>
                </div>
                <div>
                    <div className="text-2xl font-bold text-slate-900">
                      {answeredCount}
                    </div>
                    <div className="text-xs text-slate-600">Answered</div>
                  </div>
                  {answeredCount > 0 && (
                    <div>
                      <div className="text-2xl font-bold text-purple-600">
                        {Math.round((correctCount / answeredCount) * 100)}%
                      </div>
                      <div className="text-xs text-slate-600">Accuracy</div>
                    </div>
                  )}
              </div>
            </Card>

            {/* Domain Info */}
            <Card className="p-4 bg-blue-50 border-blue-200 space-y-3">
              <h3 className="font-bold text-blue-900">Domain</h3>
              <p className="text-sm text-blue-800">{currentQuestion.domain}</p>
              <Badge className="bg-blue-100 text-blue-800 w-fit">
                {currentQuestion.difficulty}
              </Badge>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
