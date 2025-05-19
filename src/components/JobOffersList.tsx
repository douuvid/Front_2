import React from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Building2, MapPin, Clock, CheckCircle, XCircle } from "lucide-react";

interface JobOffer {
  id: string;
  title: string;
  company: string;
  location: string;
  contractType: string;
  status: "Postulé" | "Ignorée";
  date: string;
}

interface JobOffersListProps {
  offers?: JobOffer[];
  onSelectOffer?: (offer: JobOffer) => void;
  currentPage?: number;
  totalPages?: number;
  onPageChange?: (page: number) => void;
}

// Helper function to determine the color based on match percentage
const getMatchColor = (percentage: number): string => {
  if (percentage >= 80) return "bg-green-500";
  if (percentage >= 60) return "bg-yellow-500";
  return "bg-red-500";
};

const JobOffersList = ({
  offers = [
    {
      id: "1",
      title: "Développeur Frontend React",
      company: "Tech Solutions",
      location: "Paris",
      contractType: "CDI",
      status: "Postulé",
      date: "2023-06-15",
    },
    {
      id: "2",
      title: "UX Designer",
      company: "Creative Studio",
      location: "Lyon",
      contractType: "CDD",
      status: "Postulé",
      date: "2023-06-14",
    },
    {
      id: "3",
      title: "Chef de Projet Digital",
      company: "Agence Web",
      location: "Marseille",
      contractType: "CDI",
      status: "Ignorée",
      date: "2023-06-13",
    },
    {
      id: "4",
      title: "Développeur Backend Node.js",
      company: "StartupLab",
      location: "Bordeaux",
      contractType: "Alternance",
      status: "Postulé",
      date: "2023-06-12",
    },
    {
      id: "5",
      title: "Data Analyst",
      company: "DataCorp",
      location: "Lille",
      contractType: "CDI",
      status: "Ignorée",
      date: "2023-06-11",
    },
  ],
  onSelectOffer = (offer) => {
    // In a real implementation, this would track the interaction for Pôle Emploi analytics
    console.log("Offer selected:", offer);

    // Example of how we would save this interaction to Supabase
    // import { applicationService } from '@/services/applicationService';
    // applicationService.saveApplication({
    //   job_title: offer.title,
    //   company: offer.company,
    //   location: offer.location,
    //   contract_type: offer.contractType,
    //   sector: offer.sector || 'Non spécifié',
    //   cv_format: 'PDF',
    //   status: 'Envoyée'
    // });
  },
  currentPage = 1,
  totalPages = 3,
  onPageChange = () => {},
}: JobOffersListProps) => {
  return (
    <div className="w-full bg-background">
      <h2 className="text-lg font-semibold mb-3">Offres récemment traitées</h2>

      <ScrollArea className="h-[400px] rounded-md border">
        <div className="p-1">
          {offers.map((offer) => (
            <Card
              key={offer.id}
              className="mb-3 cursor-pointer hover:shadow-md transition-shadow border-none shadow-sm"
              onClick={() => onSelectOffer(offer)}
            >
              <CardContent className="p-4">
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <h3 className="font-medium text-base">{offer.title}</h3>
                      {offer.matchPercentage !== undefined && (
                        <div
                          className={`flex items-center justify-center rounded-full text-xs font-bold text-white w-8 h-8 ${getMatchColor(offer.matchPercentage)}`}
                          title="Pourcentage de correspondance"
                        >
                          {offer.matchPercentage}%
                        </div>
                      )}
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Building2 className="h-3.5 w-3.5 mr-1" />
                      <span>{offer.company}</span>
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <MapPin className="h-3.5 w-3.5 mr-1" />
                      <span>{offer.location}</span>
                    </div>

                    <div className="flex items-center text-sm text-muted-foreground mt-1">
                      <Clock className="h-3.5 w-3.5 mr-1" />
                      <span>{offer.date}</span>
                    </div>
                  </div>

                  <div className="flex flex-col items-end">
                    <Badge
                      variant={
                        offer.contractType === "CDI" ? "default" : "secondary"
                      }
                      className="mb-2"
                    >
                      {offer.contractType}
                    </Badge>

                    <div className="flex items-center">
                      {offer.status === "Postulé" ? (
                        <>
                          <CheckCircle className="h-4 w-4 text-green-500 mr-1" />
                          <span className="text-xs text-green-500 font-medium">
                            {offer.status}
                          </span>
                        </>
                      ) : (
                        <>
                          <XCircle className="h-4 w-4 text-gray-400 mr-1" />
                          <span className="text-xs text-gray-400 font-medium">
                            {offer.status}
                          </span>
                        </>
                      )}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </ScrollArea>

      <Pagination className="mt-4">
        <PaginationContent>
          <PaginationItem>
            <PaginationPrevious
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage > 1) onPageChange(currentPage - 1);
              }}
              className={
                currentPage <= 1 ? "pointer-events-none opacity-50" : ""
              }
            />
          </PaginationItem>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
            <PaginationItem key={page}>
              <PaginationLink
                href="#"
                onClick={(e) => {
                  e.preventDefault();
                  onPageChange(page);
                }}
                isActive={page === currentPage}
              >
                {page}
              </PaginationLink>
            </PaginationItem>
          ))}

          <PaginationItem>
            <PaginationNext
              href="#"
              onClick={(e) => {
                e.preventDefault();
                if (currentPage < totalPages) onPageChange(currentPage + 1);
              }}
              className={
                currentPage >= totalPages
                  ? "pointer-events-none opacity-50"
                  : ""
              }
            />
          </PaginationItem>
        </PaginationContent>
      </Pagination>
    </div>
  );
};

export default JobOffersList;
