import React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, AlertCircle, HelpCircle } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

interface SkillMatch {
  skill: string;
  match: "high" | "medium" | "low";
  required: boolean;
}

interface JobMatchAnalysisProps {
  jobTitle: string;
  company: string;
  overallMatch: number;
  skillMatches: SkillMatch[];
  improvementSuggestions?: string[];
}

const JobMatchAnalysis = ({
  jobTitle = "Développeur Frontend React",
  company = "Tech Solutions",
  overallMatch = 85,
  skillMatches = [
    { skill: "React", match: "high", required: true },
    { skill: "TypeScript", match: "high", required: true },
    { skill: "CSS/SCSS", match: "medium", required: true },
    { skill: "Redux", match: "low", required: false },
    { skill: "Jest", match: "medium", required: false },
  ],
  improvementSuggestions = [
    "Ajoutez plus de détails sur vos projets React",
    "Mentionnez votre expérience avec Redux",
    "Ajoutez des certifications pertinentes",
  ],
}: JobMatchAnalysisProps) => {
  const getMatchColor = (match: string): string => {
    switch (match) {
      case "high":
        return "bg-green-500";
      case "medium":
        return "bg-yellow-500";
      case "low":
        return "bg-red-500";
      default:
        return "bg-gray-500";
    }
  };

  const getMatchText = (match: string): string => {
    switch (match) {
      case "high":
        return "Élevé";
      case "medium":
        return "Moyen";
      case "low":
        return "Faible";
      default:
        return "Inconnu";
    }
  };

  const getOverallMatchColor = (percentage: number): string => {
    if (percentage >= 80) return "text-green-500";
    if (percentage >= 60) return "text-yellow-500";
    return "text-red-500";
  };

  return (
    <Card className="w-full border-none shadow-md">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg">Analyse de correspondance</CardTitle>
        <p className="text-sm text-muted-foreground">
          {jobTitle} - {company}
        </p>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center justify-between">
          <div className="space-y-1">
            <p className="text-sm font-medium">Correspondance globale</p>
            <div className="flex items-center gap-2">
              <span
                className={`text-2xl font-bold ${getOverallMatchColor(overallMatch)}`}
              >
                {overallMatch}%
              </span>
              <TooltipProvider>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <HelpCircle className="h-4 w-4 text-muted-foreground cursor-help" />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-xs">
                      Basé sur vos compétences et expériences
                    </p>
                  </TooltipContent>
                </Tooltip>
              </TooltipProvider>
            </div>
          </div>
          <div
            className="h-16 w-16 rounded-full border-4 flex items-center justify-center"
            style={{
              borderColor:
                overallMatch >= 80
                  ? "#22c55e"
                  : overallMatch >= 60
                    ? "#eab308"
                    : "#ef4444",
            }}
          >
            {overallMatch >= 70 ? (
              <CheckCircle className="h-8 w-8 text-green-500" />
            ) : (
              <AlertCircle className="h-8 w-8 text-yellow-500" />
            )}
          </div>
        </div>

        <div>
          <p className="text-sm font-medium mb-2">Compétences requises</p>
          <div className="space-y-2">
            {skillMatches.map((skill, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="text-sm">{skill.skill}</span>
                  {skill.required && (
                    <Badge variant="outline" className="text-xs py-0 h-5">
                      Requis
                    </Badge>
                  )}
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-xs text-muted-foreground">
                    {getMatchText(skill.match)}
                  </span>
                  <div
                    className={`h-3 w-3 rounded-full ${getMatchColor(skill.match)}`}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {improvementSuggestions && improvementSuggestions.length > 0 && (
          <div>
            <p className="text-sm font-medium mb-2">
              Suggestions d'amélioration
            </p>
            <ul className="text-sm space-y-1 list-disc pl-5">
              {improvementSuggestions.map((suggestion, index) => (
                <li key={index} className="text-muted-foreground">
                  {suggestion}
                </li>
              ))}
            </ul>
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default JobMatchAnalysis;
