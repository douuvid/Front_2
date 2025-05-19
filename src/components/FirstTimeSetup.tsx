import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { ArrowLeft, ArrowRight, Briefcase, MapPin } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { Card } from "@/components/ui/card";

const CONTRACT_TYPES = [
  { id: "cdi", label: "CDI", icon: "briefcase" },
  { id: "cdd", label: "CDD", icon: "briefcase" },
  { id: "interim", label: "Intérim", icon: "briefcase" },
  { id: "freelance", label: "Freelance", icon: "briefcase" },
  { id: "stage", label: "Stage", icon: "briefcase" },
  { id: "alternance", label: "Alternance", icon: "briefcase" },
];

interface FirstTimeSetupProps {
  onComplete: (criteria: {
    position: string;
    location: string;
    contractTypes: string[];
  }) => void;
  onBack?: () => void;
}

const FirstTimeSetup = ({
  onComplete,
  onBack = () => {},
}: FirstTimeSetupProps) => {
  const [step, setStep] = useState<"position" | "location" | "contractTypes">(
    "position",
  );
  const [position, setPosition] = useState("");
  const [location, setLocation] = useState("");
  const [contractTypes, setContractTypes] = useState<string[]>([]);

  const getProgressPercentage = () => {
    switch (step) {
      case "position":
        return 33;
      case "location":
        return 66;
      case "contractTypes":
        return 100;
      default:
        return 0;
    }
  };

  const handleNext = () => {
    if (step === "position") {
      setStep("location");
    } else if (step === "location") {
      setStep("contractTypes");
    }
  };

  const handleBack = () => {
    if (step === "location") {
      setStep("position");
    } else if (step === "contractTypes") {
      setStep("location");
    } else {
      onBack();
    }
  };

  const handleComplete = () => {
    onComplete({
      position,
      location,
      contractTypes,
    });
  };

  const handleContractTypeToggle = (type: string) => {
    if (contractTypes.includes(type)) {
      setContractTypes(contractTypes.filter((t) => t !== type));
    } else {
      setContractTypes([...contractTypes, type]);
    }
  };

  const renderStepContent = () => {
    switch (step) {
      case "position":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <Briefcase className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">Quel est votre poste ?</h2>
            </div>
            <p className="text-lg text-muted-foreground">
              Décrivez le poste que vous recherchez
            </p>
            <Input
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              placeholder="Ex: Développeur web, Designer, etc."
              className="w-full max-w-md"
            />
          </motion.div>
        );
      case "location":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <MapPin className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">
                Où souhaitez-vous travailler ?
              </h2>
            </div>
            <p className="text-lg text-muted-foreground">
              Indiquez la ville ou la région
            </p>
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Ex: Paris, Lyon, etc."
              className="w-full max-w-md"
            />
          </motion.div>
        );
      case "contractTypes":
        return (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-6"
          >
            <div className="flex items-center gap-4">
              <Briefcase className="h-8 w-8 text-primary" />
              <h2 className="text-3xl font-bold">
                Quel type de contrat préférez-vous ?
              </h2>
            </div>
            <p className="text-lg text-muted-foreground">
              Sélectionnez un ou plusieurs types de contrat
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
              {CONTRACT_TYPES.map((type) => (
                <Card
                  key={type.id}
                  className={`p-4 cursor-pointer ${
                    contractTypes.includes(type.id) ? "bg-primary/10" : ""
                  } hover:bg-primary/5 transition-colors duration-200`}
                  onClick={() => handleContractTypeToggle(type.id)}
                >
                  <div className="flex items-center gap-2">
                    <Checkbox
                      checked={contractTypes.includes(type.id)}
                      onCheckedChange={() => handleContractTypeToggle(type.id)}
                    />
                    <span className="text-lg font-medium">{type.label}</span>
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        );
      default:
        return null;
    }
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-4 sm:p-6 md:p-8 bg-background text-foreground">
      {/* Header */}
      <div className="w-full">
        <Button variant="ghost" className="p-0 h-auto" onClick={handleBack}>
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour
        </Button>
      </div>

      {/* Progress Bar */}
      <div className="w-full max-w-xs sm:max-w-sm md:max-w-md mb-8">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-2">
            <Briefcase className="h-5 w-5 text-primary" />
            <span className="text-sm font-medium">
              Étape {getProgressPercentage() / 33}
            </span>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm font-medium">
              {getProgressPercentage()}%
            </span>
            <ArrowRight className="h-5 w-5 text-muted-foreground" />
          </div>
        </div>
        <Progress value={getProgressPercentage()} className="h-2" />
      </div>

      {/* Content */}
      <div className="w-full max-w-md space-y-8">{renderStepContent()}</div>

      {/* Navigation */}
      <div className="w-full flex justify-between items-center mt-auto">
        {step !== "position" && (
          <Button variant="outline" onClick={handleBack}>
            <ArrowLeft className="h-5 w-5 mr-2" />
            Précédent
          </Button>
        )}
        {step === "contractTypes" ? (
          <Button onClick={handleComplete}>Terminer</Button>
        ) : (
          <Button onClick={handleNext}>
            Continuer
            <ArrowRight className="h-5 w-5 ml-2" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default FirstTimeSetup;
