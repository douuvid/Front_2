import React, { useState, useEffect } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Separator } from "@/components/ui/separator";
import {
  BarChart,
  PieChart,
  MapPin,
  Briefcase,
  Calendar,
  Users,
  Building,
  FileText,
  Filter,
  Download,
  RefreshCw,
} from "lucide-react";
import { supabase } from "@/lib/supabaseClient";
import { ApplicationData, ApplicationStats } from "@/types/poleEmploi";

interface PoleEmploiDashboardProps {
  userId?: string;
  initialData?: ApplicationData[];
}

const PoleEmploiDashboard = ({
  userId,
  initialData = [],
}: PoleEmploiDashboardProps) => {
  const [applications, setApplications] =
    useState<ApplicationData[]>(initialData);
  const [stats, setStats] = useState<ApplicationStats>({
    totalApplications: 0,
    weeklyApplications: [12, 19, 15, 23, 28, 25, 32],
    statusDistribution: {
      Envoyée: 45,
      Vue: 30,
      Entretien: 15,
      Refusée: 8,
      Acceptée: 2,
    },
    sectorDistribution: {
      "Développement web": 35,
      "Design UX/UI": 20,
      "Marketing digital": 15,
      "Gestion de projet": 10,
      "Data Science": 20,
    },
    locationDistribution: {
      Paris: 40,
      Lyon: 20,
      Marseille: 15,
      Bordeaux: 10,
      Lille: 15,
    },
    contractTypeDistribution: {
      CDI: 50,
      CDD: 25,
      Alternance: 15,
      Stage: 10,
    },
  });
  const [isLoading, setIsLoading] = useState(false);
  const [filter, setFilter] = useState({
    period: "week",
    sector: "all",
    location: "all",
  });

  // Fetch data from Supabase
  const fetchApplicationData = async () => {
    setIsLoading(true);
    try {
      // In a real implementation, this would fetch from Supabase
      // const { data, error } = await supabase
      //   .from('applications')
      //   .select('*')
      //   .eq('user_id', userId);

      // if (error) throw error;
      // setApplications(data || []);
      // calculateStats(data || []);

      // For demo purposes, we'll just use the mock data
      setTimeout(() => {
        setIsLoading(false);
      }, 500);
    } catch (error) {
      console.error("Error fetching application data:", error);
      setIsLoading(false);
    }
  };

  // Calculate statistics from application data
  const calculateStats = (data: ApplicationData[]) => {
    // In a real implementation, this would calculate actual stats from the data
    // For now, we'll use the mock data
  };

  useEffect(() => {
    fetchApplicationData();
  }, [userId]);

  // Helper function to get the highest value in a distribution
  const getMaxValue = (distribution: Record<string, number>) => {
    return Math.max(...Object.values(distribution));
  };

  return (
    <div className="w-full space-y-4 bg-background">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">Tableau de bord Pôle Emploi</h2>
        <div className="flex items-center gap-2">
          <Select
            value={filter.period}
            onValueChange={(value) => setFilter({ ...filter, period: value })}
          >
            <SelectTrigger className="w-[150px]">
              <SelectValue placeholder="Période" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Cette semaine</SelectItem>
              <SelectItem value="month">Ce mois</SelectItem>
              <SelectItem value="quarter">Ce trimestre</SelectItem>
              <SelectItem value="year">Cette année</SelectItem>
            </SelectContent>
          </Select>
          <Button
            variant="outline"
            size="icon"
            onClick={fetchApplicationData}
            disabled={isLoading}
          >
            <RefreshCw
              className={`h-4 w-4 ${isLoading ? "animate-spin" : ""}`}
            />
          </Button>
          <Button variant="outline" size="sm">
            <Download className="h-4 w-4 mr-2" />
            Exporter
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card className="border-none shadow-md">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  Total Candidatures
                </p>
                <p className="text-2xl font-bold">
                  {stats.totalApplications || 100}
                </p>
              </div>
              <div className="p-2 bg-blue-100 rounded-full">
                <FileText className="h-5 w-5 text-blue-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  Entreprises Ciblées
                </p>
                <p className="text-2xl font-bold">
                  {Object.keys(stats.locationDistribution).length || 5}
                </p>
              </div>
              <div className="p-2 bg-green-100 rounded-full">
                <Building className="h-5 w-5 text-green-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">Taux de Réponse</p>
                <p className="text-2xl font-bold">32%</p>
              </div>
              <div className="p-2 bg-yellow-100 rounded-full">
                <Users className="h-5 w-5 text-yellow-600" />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card className="border-none shadow-md">
          <CardContent className="pt-6">
            <div className="flex justify-between items-center">
              <div>
                <p className="text-sm text-muted-foreground">
                  Entretiens Obtenus
                </p>
                <p className="text-2xl font-bold">
                  {stats.statusDistribution.Entretien || 15}
                </p>
              </div>
              <div className="p-2 bg-purple-100 rounded-full">
                <Calendar className="h-5 w-5 text-purple-600" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Weekly Applications Chart */}
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Candidatures par semaine</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[200px] flex items-end justify-between gap-2">
              {stats.weeklyApplications.map((count, index) => (
                <div
                  key={index}
                  className="relative flex flex-col items-center"
                >
                  <div
                    className="bg-blue-500 rounded-t-md w-12"
                    style={{
                      height: `${(count / Math.max(...stats.weeklyApplications)) * 150}px`,
                    }}
                  ></div>
                  <span className="text-xs mt-1">S{index + 1}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Status Distribution */}
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Distribution par statut</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(stats.statusDistribution).map(
                ([status, count]) => (
                  <div key={status} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{status}</span>
                      <span className="text-sm font-medium">{count}</span>
                    </div>
                    <Progress
                      value={
                        (count / getMaxValue(stats.statusDistribution)) * 100
                      }
                      className="h-2"
                      indicatorClassName={`
                      ${status === "Envoyée" ? "bg-blue-500" : ""}
                      ${status === "Vue" ? "bg-purple-500" : ""}
                      ${status === "Entretien" ? "bg-orange-500" : ""}
                      ${status === "Refusée" ? "bg-red-500" : ""}
                      ${status === "Acceptée" ? "bg-green-500" : ""}
                    `}
                    />
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Sector Distribution */}
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Secteurs d'activité</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(stats.sectorDistribution).map(
                ([sector, count]) => (
                  <div key={sector} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">{sector}</span>
                      <span className="text-sm font-medium">{count}</span>
                    </div>
                    <Progress
                      value={
                        (count / getMaxValue(stats.sectorDistribution)) * 100
                      }
                      className="h-2"
                    />
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>

        {/* Location Distribution */}
        <Card className="border-none shadow-md">
          <CardHeader className="pb-2">
            <CardTitle className="text-lg">Répartition géographique</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {Object.entries(stats.locationDistribution).map(
                ([location, count]) => (
                  <div key={location} className="space-y-1">
                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-1">
                        <MapPin className="h-3 w-3 text-muted-foreground" />
                        <span className="text-sm">{location}</span>
                      </div>
                      <span className="text-sm font-medium">{count}</span>
                    </div>
                    <Progress
                      value={
                        (count / getMaxValue(stats.locationDistribution)) * 100
                      }
                      className="h-2"
                    />
                  </div>
                ),
              )}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Contract Type Distribution */}
      <Card className="border-none shadow-md">
        <CardHeader className="pb-2">
          <CardTitle className="text-lg">Types de contrat</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex justify-between items-center gap-4">
            {Object.entries(stats.contractTypeDistribution).map(
              ([type, count]) => (
                <div
                  key={type}
                  className="flex-1 text-center p-4 bg-muted/50 rounded-lg"
                >
                  <div className="text-2xl font-bold">{count}</div>
                  <div className="text-sm text-muted-foreground">{type}</div>
                  <Progress
                    value={
                      (count / getMaxValue(stats.contractTypeDistribution)) *
                      100
                    }
                    className="h-1.5 mt-2"
                  />
                </div>
              ),
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default PoleEmploiDashboard;
