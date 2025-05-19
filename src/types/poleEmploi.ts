export interface ApplicationData {
  id?: string;
  created_at?: string;
  user_id?: string;
  job_title: string;
  company: string;
  sector: string;
  location: string;
  cv_format: string;
  status: "Envoyée" | "Vue" | "Entretien" | "Refusée" | "Acceptée";
  contract_type: string;
}

export interface ApplicationStats {
  totalApplications: number;
  weeklyApplications: number[];
  statusDistribution: Record<string, number>;
  sectorDistribution: Record<string, number>;
  locationDistribution: Record<string, number>;
  contractTypeDistribution: Record<string, number>;
}
