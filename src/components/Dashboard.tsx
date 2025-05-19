import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Settings,
  BarChart2,
  Clock,
  CheckCircle,
  MapPin,
  Briefcase,
  FileText,
  Edit,
  History,
  BarChart,
} from "lucide-react";
import { Separator } from "@/components/ui/separator";
import { Progress } from "@/components/ui/progress";
import JobOffersList from "./JobOffersList";
import JobCriteriaForm from "./JobCriteriaForm";
import JobMatchAnalysis from "./JobMatchAnalysis";
import { ThemeToggle } from "./ThemeToggle";
import { AccessibilityMenu } from "./AccessibilityMenu";

interface DashboardProps {
  userName?: string;
  automationActive?: boolean;
  jobCriteria?: {
    position: string;
    location: string;
    contractTypes: string[];
  };
  statistics?: {
    totalApplications: number;
    successRate: number;
    lastApplicationDate: string;
  };
}

const Dashboard = ({
  userName = "Thomas",
  automationActive = true,
  jobCriteria = JSON.parse(
    localStorage.getItem("jobCriteria") ||
      JSON.stringify({
        position: "Développeur Web",
        location: "Paris (75)",
        contractTypes: ["CDI", "CDD"],
      }),
  ),
  statistics = {
    totalApplications: 47,
    successRate: 85,
    lastApplicationDate: "12/05/2023",
  },
}: DashboardProps) => {
  const [isAutomationActive, setIsAutomationActive] =
    useState(automationActive);
  const [currentJobCriteria, setCurrentJobCriteria] = useState(jobCriteria);
  const [isEditingCriteria, setIsEditingCriteria] = useState(false);

  const handleAutomationToggle = () => {
    setIsAutomationActive(!isAutomationActive);
  };

  const handleSaveCriteria = (newCriteria: {
    position: string;
    location: string;
    contractTypes: string[];
  }) => {
    setCurrentJobCriteria(newCriteria);
    setIsEditingCriteria(false);
  };

  return (
    <div className="flex flex-col h-full min-h-screen bg-background p-4 space-y-4">
      {/* Header */}
      <div className="flex justify-between items-center mb-2">
        <div>
          <h1 className="text-2xl font-bold">Bonjour, {userName}</h1>
          <p className="text-muted-foreground">Tableau de bord</p>
        </div>
        <div className="flex items-center gap-2">
          <ThemeToggle />
          <AccessibilityMenu />
          <Button
            variant="ghost"
            size="icon"
            className="rounded-full h-10 w-10"
          >
            <Settings className="h-5 w-5" />
          </Button>
        </div>
      </div>
      {/* Main Content */}
      <Tabs defaultValue="dashboard" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="dashboard" className="flex items-center gap-1">
            <BarChart className="h-4 w-4" />
            Tableau de bord
          </TabsTrigger>
          <TabsTrigger value="history" className="flex items-center gap-1">
            <History className="h-4 w-4" />
            Historique
          </TabsTrigger>
        </TabsList>

        <TabsContent value="dashboard" className="mt-0">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {/* Left Column */}
            <div className="space-y-4">
              {/* Automation Status */}
              <Card className="w-full overflow-hidden border-none shadow-md">
                <CardContent className="p-4">
                  <div className="flex justify-between items-center">
                    <div>
                      <h2 className="text-lg font-medium">Automatisation</h2>
                      <p className="text-sm text-muted-foreground">
                        {isAutomationActive ? "Active" : "Inactive"}
                      </p>
                    </div>
                    <Switch
                      checked={isAutomationActive}
                      onCheckedChange={handleAutomationToggle}
                      className="data-[state=checked]:bg-green-500"
                    />
                  </div>
                </CardContent>
              </Card>

              {/* Job Criteria */}
              <Card className="w-full overflow-hidden border-none shadow-md">
                <CardHeader className="pb-2">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg flex items-center gap-2">
                      <FileText className="h-5 w-5 text-muted-foreground" />
                      Critères de recherche
                    </CardTitle>
                    {!isEditingCriteria && (
                      <Button
                        variant="ghost"
                        size="sm"
                        className="h-8 w-8 p-0 flex-row"
                        onClick={() => setIsEditingCriteria(true)}
                      >
                        <Edit className="h-4 w-4" />
                      </Button>
                    )}
                  </div>
                </CardHeader>
                <CardContent className="space-y-3 pt-0">
                  {isEditingCriteria ? (
                    <JobCriteriaForm
                      initialCriteria={currentJobCriteria}
                      onSave={handleSaveCriteria}
                      onCancel={() => setIsEditingCriteria(false)}
                    />
                  ) : (
                    <>
                      <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full p-2">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">Poste</p>
                          <p className="font-medium">
                            {currentJobCriteria.position}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center gap-3">
                        <div className="bg-muted rounded-full p-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                        </div>
                        <div>
                          <p className="text-xs text-muted-foreground">
                            Localisation
                          </p>
                          <p className="font-medium">
                            {currentJobCriteria.location}
                          </p>
                        </div>
                      </div>

                      <div>
                        <p className="text-xs text-muted-foreground mb-2">
                          Types de contrat
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {currentJobCriteria.contractTypes.map(
                            (type, index) => (
                              <Badge
                                key={index}
                                variant="outline"
                                className="rounded-full"
                              >
                                {type}
                              </Badge>
                            ),
                          )}
                        </div>
                      </div>
                    </>
                  )}
                </CardContent>
              </Card>

              {/* Statistics */}
              <Card className="w-full overflow-hidden border-none shadow-md">
                <CardHeader className="pb-2">
                  <CardTitle className="text-lg flex items-center gap-2">
                    <BarChart2 className="h-5 w-5 text-muted-foreground" />
                    Statistiques
                  </CardTitle>
                </CardHeader>
                <CardContent className="space-y-4 pt-0">
                  <div className="grid grid-cols-2 gap-4">
                    <div className="flex flex-col p-3 bg-muted/50 rounded-lg">
                      <span className="text-2xl font-bold">
                        {statistics.totalApplications}
                      </span>
                      <span className="text-xs text-muted-foreground">
                        Candidatures
                      </span>
                    </div>
                    <div className="flex flex-col p-3 bg-muted/50 rounded-lg">
                      <div className="flex items-center gap-2">
                        <span className="text-2xl font-bold">
                          {statistics.successRate}%
                        </span>
                      </div>
                      <span className="text-xs text-muted-foreground">
                        Taux de succès
                      </span>
                      <Progress
                        value={statistics.successRate}
                        className="h-1.5 mt-1"
                        indicatorClassName="bg-green-500"
                      />
                    </div>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-1">
                      <Clock className="h-4 w-4 text-muted-foreground" />
                      <span className="text-muted-foreground">
                        Dernière candidature
                      </span>
                    </div>
                    <span>{statistics.lastApplicationDate}</span>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Right Column */}
            <div className="space-y-4">
              {/* Job Match Analysis */}
              <JobMatchAnalysis />

              {/* Recent Job Offers */}
              <div className="space-y-2">
                <div className="flex justify-between items-center">
                  <h2 className="text-lg font-medium">Offres récentes</h2>
                  <Badge
                    variant="outline"
                    className="flex items-center gap-1 rounded-full bg-green-50 text-green-600 border-green-200"
                  >
                    <CheckCircle className="h-3 w-3" />
                    {statistics.totalApplications} postulées
                  </Badge>
                </div>
                <JobOffersList />
              </div>
            </div>
          </div>
        </TabsContent>

        <TabsContent value="history" className="mt-0">
          {/* Placeholder for ApplicationHistory component */}
          <div className="p-4 bg-muted rounded-lg">
            <h3 className="text-lg font-medium mb-2">
              Historique des candidatures
            </h3>
            <p className="text-muted-foreground">
              L'historique de vos candidatures sera affiché ici.
            </p>
          </div>
        </TabsContent>

        <TabsContent value="pole-emploi" className="mt-0">
          <PoleEmploiDashboard />
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default Dashboard;
