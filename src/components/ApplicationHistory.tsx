import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import {
  Calendar,
  CheckCircle,
  Clock,
  Eye,
  FileText,
  Filter,
  Search,
  XCircle,
} from "lucide-react";
import { Input } from "@/components/ui/input";

interface Application {
  id: string;
  jobTitle: string;
  company: string;
  date: string;
  status: "Envoyée" | "Vue" | "Entretien" | "Refusée" | "Acceptée";
}

interface ApplicationHistoryProps {
  applications?: Application[];
  onViewApplication?: (id: string) => void;
}

const ApplicationHistory = ({
  applications = [
    {
      id: "1",
      jobTitle: "Développeur Frontend React",
      company: "Tech Solutions",
      date: "15/06/2023",
      status: "Envoyée",
    },
    {
      id: "2",
      jobTitle: "UX Designer",
      company: "Creative Studio",
      date: "10/06/2023",
      status: "Vue",
    },
    {
      id: "3",
      jobTitle: "Chef de Projet Digital",
      company: "Agence Web",
      date: "05/06/2023",
      status: "Entretien",
    },
    {
      id: "4",
      jobTitle: "Développeur Backend Node.js",
      company: "StartupLab",
      date: "01/06/2023",
      status: "Refusée",
    },
    {
      id: "5",
      jobTitle: "Data Analyst",
      company: "DataCorp",
      date: "25/05/2023",
      status: "Acceptée",
    },
  ],
  onViewApplication = () => {},
}: ApplicationHistoryProps) => {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "Envoyée":
        return <Clock className="h-4 w-4 text-blue-500" />;
      case "Vue":
        return <Eye className="h-4 w-4 text-purple-500" />;
      case "Entretien":
        return <Calendar className="h-4 w-4 text-orange-500" />;
      case "Refusée":
        return <XCircle className="h-4 w-4 text-red-500" />;
      case "Acceptée":
        return <CheckCircle className="h-4 w-4 text-green-500" />;
      default:
        return <FileText className="h-4 w-4 text-gray-500" />;
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "Envoyée":
        return "bg-blue-100 text-blue-800 border-blue-200";
      case "Vue":
        return "bg-purple-100 text-purple-800 border-purple-200";
      case "Entretien":
        return "bg-orange-100 text-orange-800 border-orange-200";
      case "Refusée":
        return "bg-red-100 text-red-800 border-red-200";
      case "Acceptée":
        return "bg-green-100 text-green-800 border-green-200";
      default:
        return "bg-gray-100 text-gray-800 border-gray-200";
    }
  };

  const filteredApplications = applications.filter((app) => {
    // Filter by tab
    if (
      activeTab !== "all" &&
      app.status.toLowerCase() !== activeTab.toLowerCase()
    ) {
      return false;
    }

    // Filter by search query
    if (
      searchQuery &&
      !app.jobTitle.toLowerCase().includes(searchQuery.toLowerCase()) &&
      !app.company.toLowerCase().includes(searchQuery.toLowerCase())
    ) {
      return false;
    }

    return true;
  });

  return (
    <Card className="w-full border-none shadow-md">
      <CardHeader className="pb-2">
        <div className="flex justify-between items-center">
          <CardTitle className="text-lg">Historique des candidatures</CardTitle>
          <Badge variant="outline">{applications.length} candidatures</Badge>
        </div>
      </CardHeader>
      <CardContent className="space-y-4 p-4">
        <div className="flex items-center gap-2">
          <div className="relative flex-1">
            <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="Rechercher par poste ou entreprise"
              className="pl-8"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
        </div>

        <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-6 mb-2">
            <TabsTrigger value="all">Tous</TabsTrigger>
            <TabsTrigger value="envoyée">Envoyées</TabsTrigger>
            <TabsTrigger value="vue">Vues</TabsTrigger>
            <TabsTrigger value="entretien">Entretiens</TabsTrigger>
            <TabsTrigger value="refusée">Refusées</TabsTrigger>
            <TabsTrigger value="acceptée">Acceptées</TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-0">
            <ScrollArea className="h-[400px]">
              {filteredApplications.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-40 text-center">
                  <FileText className="h-8 w-8 text-muted-foreground mb-2" />
                  <p className="text-muted-foreground">
                    Aucune candidature trouvée
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {filteredApplications.map((app) => (
                    <div
                      key={app.id}
                      className="p-3 border rounded-md hover:bg-muted/50 transition-colors cursor-pointer"
                      onClick={() => onViewApplication(app.id)}
                    >
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-medium text-sm">
                            {app.jobTitle}
                          </h3>
                          <p className="text-xs text-muted-foreground">
                            {app.company}
                          </p>
                        </div>
                        <Badge
                          variant="outline"
                          className={`flex items-center gap-1 ${getStatusColor(app.status)}`}
                        >
                          {getStatusIcon(app.status)}
                          <span>{app.status}</span>
                        </Badge>
                      </div>
                      <div className="flex justify-between items-center mt-2">
                        <span className="text-xs text-muted-foreground">
                          Postuléé le {app.date}
                        </span>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="h-7 text-xs"
                        >
                          <Eye className="h-3 w-3 mr-1" />
                          Détails
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </TabsContent>
        </Tabs>
      </CardContent>
    </Card>
  );
};

export default ApplicationHistory;
