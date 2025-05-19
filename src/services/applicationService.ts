import { supabase } from "@/lib/supabaseClient";
import { ApplicationData } from "@/types/poleEmploi";

/**
 * Service to handle application data for Pôle Emploi analytics
 */
export const applicationService = {
  /**
   * Save application data to Supabase
   */
  saveApplication: async (applicationData: ApplicationData) => {
    try {
      // In a real implementation, this would save to Supabase
      // const { data, error } = await supabase
      //   .from('applications')
      //   .insert(applicationData);

      // if (error) throw error;
      // return data;

      // For demo purposes, we'll just log the data
      console.log("Application data saved:", applicationData);
      return applicationData;
    } catch (error) {
      console.error("Error saving application data:", error);
      throw error;
    }
  },

  /**
   * Get all applications for a user
   */
  getUserApplications: async (userId: string) => {
    try {
      // In a real implementation, this would fetch from Supabase
      // const { data, error } = await supabase
      //   .from('applications')
      //   .select('*')
      //   .eq('user_id', userId);

      // if (error) throw error;
      // return data;

      // For demo purposes, we'll return mock data
      return [];
    } catch (error) {
      console.error("Error fetching user applications:", error);
      throw error;
    }
  },

  /**
   * Get application statistics
   */
  getApplicationStats: async (userId: string, period: string = "all") => {
    try {
      // In a real implementation, this would calculate stats from Supabase data
      // For demo purposes, we'll return mock data
      return {
        totalApplications: 100,
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
      };
    } catch (error) {
      console.error("Error fetching application stats:", error);
      throw error;
    }
  },
};
