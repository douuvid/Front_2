import React, { useState } from "react";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, CheckCircle, AlertCircle } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface FirstTimeConnectionProps {
  onBack?: () => void;
  onComplete?: () => void;
}

const FirstTimeConnection = ({
  onBack = () => {},
  onComplete = () => {},
}: FirstTimeConnectionProps) => {
  const [step, setStep] = useState<"credentials" | "verification" | "success">(
    "credentials",
  );
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [verificationCode, setVerificationCode] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmitCredentials = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate API call to France Travail
    setTimeout(() => {
      setIsLoading(false);
      if (email && password) {
        setStep("verification");
      } else {
        setError("Veuillez remplir tous les champs");
      }
    }, 1500);
  };

  const handleVerifyCode = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    // Simulate verification
    setTimeout(() => {
      setIsLoading(false);
      if (verificationCode === "123456" || verificationCode.length === 6) {
        setStep("success");
      } else {
        setError("Code de vérification invalide");
      }
    }, 1500);
  };

  const handleComplete = () => {
    onComplete();
  };

  return (
    <div className="flex flex-col items-center justify-between min-h-screen p-4 sm:p-6 md:p-8 bg-background text-foreground">
      {/* Header */}
      <div className="w-full">
        <Button variant="ghost" className="p-0 h-auto" onClick={onBack}>
          <ArrowLeft className="h-5 w-5 mr-2" />
          Retour
        </Button>
      </div>

      {/* Content */}
      <div className="w-full flex-1 flex flex-col items-center justify-center max-w-xs sm:max-w-sm md:max-w-md mx-auto py-4 sm:py-8">
        {step === "credentials" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
              Connexion à France Travail
            </h1>

            <div className="bg-blue-50 text-blue-700 p-3 sm:p-4 rounded-md mb-4 sm:mb-6 flex items-start">
              <AlertCircle className="h-5 w-5 mr-2 flex-shrink-0 mt-0.5" />
              <p className="text-sm">
                Pour utiliser notre service d'automatisation, vous devez vous
                connecter avec vos identifiants France Travail (Pôle Emploi) ou
                APEC.
              </p>
            </div>

            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                {error}
              </div>
            )}

            <form onSubmit={handleSubmitCredentials} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email">Identifiant France Travail</Label>
                <Input
                  id="email"
                  type="text"
                  placeholder="Votre identifiant"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="Votre mot de passe"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full py-3 sm:py-6"
                disabled={isLoading}
              >
                {isLoading ? "Connexion en cours..." : "Se connecter"}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </motion.div>
        )}

        {step === "verification" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full"
          >
            <h1 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-center">
              Vérification
            </h1>

            <p className="text-center mb-4 sm:mb-6 text-muted-foreground text-sm sm:text-base">
              Un code de vérification a été envoyé à votre adresse email
              associée à votre compte France Travail.
            </p>

            {error && (
              <div className="bg-red-50 text-red-700 p-3 rounded-md mb-4 flex items-center">
                <AlertCircle className="h-4 w-4 mr-2" />
                {error}
              </div>
            )}

            <form onSubmit={handleVerifyCode} className="space-y-6">
              <div className="space-y-2">
                <Label htmlFor="code">Code de vérification</Label>
                <Input
                  id="code"
                  type="text"
                  placeholder="Entrez le code à 6 chiffres"
                  value={verificationCode}
                  onChange={(e) => setVerificationCode(e.target.value)}
                  maxLength={6}
                  className="text-center text-xl tracking-widest"
                  disabled={isLoading}
                />
              </div>

              <Button
                type="submit"
                className="w-full py-3 sm:py-6"
                disabled={isLoading}
              >
                {isLoading ? "Vérification..." : "Vérifier le code"}
                {!isLoading && <ArrowRight className="ml-2 h-4 w-4" />}
              </Button>
            </form>
          </motion.div>
        )}

        {step === "success" && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="w-full text-center"
          >
            <div className="mb-6 flex justify-center">
              <div className="h-16 w-16 bg-green-100 rounded-full flex items-center justify-center">
                <CheckCircle className="h-8 w-8 text-green-600" />
              </div>
            </div>

            <h1 className="text-2xl font-bold mb-4">Connexion réussie !</h1>

            <p className="text-muted-foreground mb-8">
              Votre compte France Travail a été connecté avec succès. Vous
              pouvez maintenant configurer vos critères de recherche d'emploi.
            </p>

            <Button
              onClick={handleComplete}
              className="w-full py-3 sm:py-6 text-base font-medium shadow-md hover:shadow-lg transition-shadow"
            >
              Continuer vers la configuration
              <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </motion.div>
        )}
      </div>

      {/* Footer - Empty space for layout balance */}
      <div className="h-8"></div>
    </div>
  );
};

export default FirstTimeConnection;
