import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { INTERVIEW_DOMAINS, DIFFICULTY_LEVELS } from "@/constants";
import * as Icons from "lucide-react";
import { ChevronRight } from "lucide-react";

export default function InterviewDomainSelect() {
  const [selectedDomain, setSelectedDomain] = useState<string>("");
  const [selectedDifficulty, setSelectedDifficulty] =
    useState<string>("intermediate");
  const navigate = useNavigate();

  const handleStartInterview = () => {
    if (selectedDomain) {
      navigate("/interview", {
        state: {
          selectedDomain,
          selectedDifficulty,
        },
      });
    }
  };

  const selectedDomainData = INTERVIEW_DOMAINS.find(
    (d) => d.id === selectedDomain,
  );

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-blue-50 p-4 pt-24">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12 space-y-3">
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">
            Choose Your Interview Domain
          </h1>
          <p className="text-lg text-slate-600 max-w-2xl mx-auto">
            Select the domain you want to practice and difficulty level to get
            started
          </p>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Domain Selection */}
          <div className="lg:col-span-2">
            <Card className="p-6 space-y-4">
              <h2 className="text-xl font-bold text-slate-900">
                Available Domains
              </h2>

              <div className="grid md:grid-cols-2 gap-4">
                {INTERVIEW_DOMAINS.map((domain) => {
                  const IconComponent = Icons[
                    domain.icon as keyof typeof Icons
                  ] as React.ComponentType<any> | undefined;
                  const isSelected = selectedDomain === domain.id;

                  return (
                    <button
                      key={domain.id}
                      onClick={() => setSelectedDomain(domain.id)}
                      className={`p-6 rounded-xl border-2 transition-all text-left ${
                        isSelected
                          ? "border-blue-400 bg-blue-50 shadow-md"
                          : "border-slate-200 hover:border-blue-300 bg-white"
                      }`}
                    >
                      <div className="flex items-start gap-3">
                        <div
                          className={`p-3 rounded-lg ${
                            isSelected ? "bg-blue-200" : "bg-slate-100"
                          }`}
                        >
                          {IconComponent ? (
                            <IconComponent
                              className={`w-6 h-6 ${
                                isSelected ? "text-blue-600" : "text-slate-600"
                              }`}
                            />
                          ) : null}
                        </div>
                        <div className="flex-1">
                          <h3
                            className={`font-bold ${isSelected ? "text-blue-900" : "text-slate-900"}`}
                          >
                            {domain.name}
                          </h3>
                          <p
                            className={`text-sm ${isSelected ? "text-blue-700" : "text-slate-600"}`}
                          >
                            {domain.slug}
                          </p>
                        </div>
                        {isSelected && (
                          <div className="w-5 h-5 bg-blue-600 rounded-full flex items-center justify-center">
                            <ChevronRight className="w-3 h-3 text-white" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>
            </Card>
          </div>

          {/* Sidebar - Configuration */}
          <div className="space-y-6">
            {/* Difficulty Selection */}
            <Card className="p-6 space-y-4">
              <h3 className="font-bold text-slate-900">Difficulty Level</h3>
              <div className="space-y-3">
                {DIFFICULTY_LEVELS.map((level) => (
                  <button
                    key={level.value}
                    onClick={() => setSelectedDifficulty(level.value)}
                    className={`w-full p-3 rounded-lg border-2 text-left transition-all font-medium ${
                      selectedDifficulty === level.value
                        ? `border-${level.color}-400 bg-${level.color}-50 text-${level.color}-900`
                        : "border-slate-200 bg-white text-slate-700 hover:border-slate-300"
                    }`}
                  >
                    {level.label}
                  </button>
                ))}
              </div>
            </Card>

            {/* Session Summary */}
            <Card className="p-6 space-y-4 bg-gradient-to-br from-blue-50 to-purple-50 border-blue-200">
              <h3 className="font-bold text-slate-900">Session Summary</h3>

              {selectedDomainData ? (
                <div className="space-y-4">
                  <div>
                    <p className="text-sm text-slate-600 mb-1">Domain</p>
                    <p className="font-bold text-slate-900">
                      {selectedDomainData.name}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm text-slate-600 mb-1">Difficulty</p>
                    <Badge
                      className={`bg-${
                        DIFFICULTY_LEVELS.find(
                          (d) => d.value === selectedDifficulty,
                        )?.color || "slate"
                      }-100 text-${
                        DIFFICULTY_LEVELS.find(
                          (d) => d.value === selectedDifficulty,
                        )?.color || "slate"
                      }-800`}
                    >
                      {DIFFICULTY_LEVELS.find(
                        (d) => d.value === selectedDifficulty,
                      )?.label || "Select"}
                    </Badge>
                  </div>

                  <div className="bg-white rounded-lg p-4 space-y-2">
                    <p className="text-sm text-slate-600">Interview Details</p>
                    <ul className="text-sm space-y-1 text-slate-700">
                      <li>• Duration: ~10-15 minutes</li>
                      <li>• Questions: 3-5</li>
                      <li>• AI Feedback: Real-time</li>
                      <li>• Recording: Enabled</li>
                    </ul>
                  </div>

                  <Button
                    onClick={handleStartInterview}
                    className="w-full bg-gradient-to-r from-blue-600 to-purple-600"
                    size="lg"
                  >
                    Start Interview
                  </Button>
                </div>
              ) : (
                <div className="text-center py-6">
                  <p className="text-slate-600">
                    Select a domain to start practicing
                  </p>
                </div>
              )}
            </Card>

            {/* Tips */}
            <Card className="p-4 bg-blue-50 border-blue-200 space-y-3">
              <h4 className="font-bold text-blue-900 text-sm">Tips</h4>
              <ul className="text-xs text-blue-800 space-y-2">
                <li>✓ Find a quiet place</li>
                <li>✓ Check your camera & mic</li>
                <li>✓ Sit up straight</li>
                <li>✓ Maintain eye contact</li>
                <li>✓ Speak clearly</li>
              </ul>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}
