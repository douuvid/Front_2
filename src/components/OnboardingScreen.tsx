import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import FirstTimeConnection from "./FirstTimeConnection";
import FirstTimeSetup from "./FirstTimeSetup";

interface OnboardingScreenProps {
  onCreateAccount?: () => void;
  onLogin?: () => void;
}

const OnboardingScreen = ({
  onCreateAccount = () => {},
  onLogin = () => {},
}: OnboardingScreenProps) => {
  const [currentStep, setCurrentStep] = useState<
    "welcome" | "connection" | "setup"
  >("welcome");

  const handleConnectionComplete = () => {
    setCurrentStep("setup");
  };

  const handleSetupComplete = (criteria: {
    position: string;
    location: string;
    contractTypes: string[];
  }) => {
    // Save the job criteria to localStorage
    localStorage.setItem("jobCriteria", JSON.stringify(criteria));
    // Mark setup as completed
    localStorage.setItem("hasCompletedSetup", "true");
    // Notification will be handled by the Toaster component
    // Redirect to dashboard
    window.location.href = "/dashboard";
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-4 sm:p-6 md:p-8 bg-background text-foreground">
      {currentStep === "connection" && (
        <FirstTimeConnection
          onBack={() => setCurrentStep("welcome")}
          onComplete={handleConnectionComplete}
        />
      )}

      {currentStep === "setup" && (
        <FirstTimeSetup
          onBack={() => setCurrentStep("connection")}
          onComplete={handleSetupComplete}
        />
      )}

      {currentStep === "welcome" && (
        <>
          {/* Logo and Header Section */}
          <div className="w-full max-w-screen-sm mx-auto flex-1 flex flex-col items-center justify-center space-y-6 md:space-y-8 text-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="mb-6"
            >
              <div className="h-20 w-20 bg-primary rounded-full flex items-center justify-center mb-6 mx-auto">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="40"
                  height="40"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  className="text-primary-foreground"
                >
                  <path d="M17 6.1H3" />
                  <path d="M21 12.1H3" />
                  <path d="M15.1 18H3" />
                </svg>
              </div>

              <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-2">
                Candidature Automatique
              </h1>
              <p className="text-muted-foreground text-sm">France Travail</p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.6 }}
              className="max-w-md"
            >
              <h2 className="text-xl sm:text-2xl font-semibold mb-4">
                Fini les candidatures manuelles.
              </h2>
              <p className="text-lg sm:text-xl font-medium text-primary mb-2">
                Automatisez, trouvez, postulez.
              </p>
              <p className="text-muted-foreground mb-4">
                Connectez votre compte France Travail et laissez notre
                application postuler automatiquement aux offres qui
                correspondent à vos critères.
              </p>
            </motion.div>
          </div>

          {/* Authentication Buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            className="w-full max-w-xs sm:max-w-sm md:max-w-md space-y-4 mt-6 md:mt-8"
          >
            <Button
              className="w-full py-4 sm:py-6 text-base font-medium shadow-md hover:shadow-lg transition-shadow"
              onClick={() => setCurrentStep("connection")}
            >
              Créer un compte
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>

            <Button
              variant="outline"
              className="w-full py-4 sm:py-6 text-base font-medium border-2 hover:bg-gray-50 transition-colors"
              onClick={() => setCurrentStep("connection")}
            >
              Se connecter
            </Button>
          </motion.div>
        </>
      )}
    </div>
  );
};

export default OnboardingScreen;
