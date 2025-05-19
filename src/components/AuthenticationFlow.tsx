import React, { useState } from "react";
import { Button } from "./ui/button";
import { Input } from "./ui/input";
import { Label } from "./ui/label";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "./ui/card";
import { Checkbox } from "./ui/checkbox";
import { Progress } from "./ui/progress";
import { Separator } from "./ui/separator";
import { ScrollArea } from "./ui/scroll-area";
import {
  ChevronRight,
  Lock,
  Mail,
  User,
  MapPin,
  Briefcase,
  FileText,
} from "lucide-react";

interface AuthenticationFlowProps {
  onComplete?: () => void;
}

const AuthenticationFlow = ({
  onComplete = () => {},
}: AuthenticationFlowProps) => {
  const [step, setStep] = useState<number>(1);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [franceTravaildId, setFranceTravaildId] = useState<string>("");
  const [franceTravaildPassword, setFranceTravaildPassword] =
    useState<string>("");
  const [acceptedTerms, setAcceptedTerms] = useState<boolean>(false);
  const [jobTitle, setJobTitle] = useState<string>("");
  const [location, setLocation] = useState<string>("");
  const [contractType, setContractType] = useState<string>("CDI");

  const totalSteps = 4;
  const progress = (step / totalSteps) * 100;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    } else {
      onComplete();
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const isStepValid = () => {
    switch (step) {
      case 1: // Registration/Login
        return email.trim() !== "" && password.trim() !== "";
      case 2: // Terms of Service
        return acceptedTerms;
      case 3: // France Travail Connection
        return (
          franceTravaildId.trim() !== "" && franceTravaildPassword.trim() !== ""
        );
      case 4: // Job Search Criteria
        return jobTitle.trim() !== "" && location.trim() !== "";
      default:
        return false;
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-4 bg-background">
      <Card className="w-full max-w-md bg-white shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-center">
            {step === 1 && "Créer un compte"}
            {step === 2 && "Conditions d'utilisation"}
            {step === 3 && "Connexion France Travail"}
            {step === 4 && "Critères de recherche"}
          </CardTitle>
          <CardDescription className="text-center text-muted-foreground">
            {step === 1 && "Créez votre compte ou connectez-vous"}
            {step === 2 && "Veuillez lire et accepter nos conditions"}
            {step === 3 && "Connectez votre compte France Travail"}
            {step === 4 && "Définissez vos critères de recherche d'emploi"}
          </CardDescription>
          <Progress value={progress} className="mt-2" />
        </CardHeader>

        <CardContent className="space-y-4">
          {step === 1 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="votre@email.com"
                    className="pl-10"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Mot de passe</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {step === 2 && (
            <>
              <ScrollArea className="h-60 rounded border p-4">
                <div className="space-y-4">
                  <h3 className="font-medium">
                    Conditions Générales d'Utilisation
                  </h3>
                  <p>
                    Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                    Nullam euismod, nisl eget aliquam ultricies, nunc nisl
                    aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam
                    euismod, nisl eget aliquam ultricies, nunc nisl aliquet
                    nunc, quis aliquam nisl nunc quis nisl.
                  </p>
                  <p>
                    Nullam euismod, nisl eget aliquam ultricies, nunc nisl
                    aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam
                    euismod, nisl eget aliquam ultricies, nunc nisl aliquet
                    nunc, quis aliquam nisl nunc quis nisl.
                  </p>
                  <p>
                    Nullam euismod, nisl eget aliquam ultricies, nunc nisl
                    aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam
                    euismod, nisl eget aliquam ultricies, nunc nisl aliquet
                    nunc, quis aliquam nisl nunc quis nisl.
                  </p>
                  <p>
                    Nullam euismod, nisl eget aliquam ultricies, nunc nisl
                    aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam
                    euismod, nisl eget aliquam ultricies, nunc nisl aliquet
                    nunc, quis aliquam nisl nunc quis nisl.
                  </p>
                  <p>
                    Nullam euismod, nisl eget aliquam ultricies, nunc nisl
                    aliquet nunc, quis aliquam nisl nunc quis nisl. Nullam
                    euismod, nisl eget aliquam ultricies, nunc nisl aliquet
                    nunc, quis aliquam nisl nunc quis nisl.
                  </p>
                </div>
              </ScrollArea>
              <div className="flex items-center space-x-2 pt-2">
                <Checkbox
                  id="terms"
                  checked={acceptedTerms}
                  onCheckedChange={(checked) =>
                    setAcceptedTerms(checked === true)
                  }
                />
                <Label htmlFor="terms" className="text-sm">
                  J'accepte les conditions générales d'utilisation
                </Label>
              </div>
            </>
          )}

          {step === 3 && (
            <>
              <div className="flex justify-center mb-4">
                <div className="p-3 rounded-full bg-blue-50">
                  <Lock className="h-6 w-6 text-blue-500" />
                </div>
              </div>
              <p className="text-center text-sm mb-4">
                Vos identifiants sont transmis de manière sécurisée et ne sont
                utilisés que pour la connexion à France Travail.
              </p>
              <div className="space-y-2">
                <Label htmlFor="franceTravaildId">
                  Identifiant France Travail
                </Label>
                <div className="relative">
                  <User className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="franceTravaildId"
                    placeholder="Votre identifiant"
                    className="pl-10"
                    value={franceTravaildId}
                    onChange={(e) => setFranceTravaildId(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="franceTravaildPassword">
                  Mot de passe France Travail
                </Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="franceTravaildPassword"
                    type="password"
                    placeholder="••••••••"
                    className="pl-10"
                    value={franceTravaildPassword}
                    onChange={(e) => setFranceTravaildPassword(e.target.value)}
                  />
                </div>
              </div>
            </>
          )}

          {step === 4 && (
            <>
              <div className="space-y-2">
                <Label htmlFor="jobTitle">Métier recherché</Label>
                <div className="relative">
                  <Briefcase className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="jobTitle"
                    placeholder="Ex: Développeur Web"
                    className="pl-10"
                    value={jobTitle}
                    onChange={(e) => setJobTitle(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Localisation</Label>
                <div className="relative">
                  <MapPin className="absolute left-3 top-2.5 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="location"
                    placeholder="Code postal ou ville"
                    className="pl-10"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="contractType">Type de contrat</Label>
                <div className="grid grid-cols-2 gap-2">
                  {["CDI", "CDD", "Intérim", "Alternance"].map((type) => (
                    <Button
                      key={type}
                      type="button"
                      variant={contractType === type ? "default" : "outline"}
                      className="justify-start"
                      onClick={() => setContractType(type)}
                    >
                      <FileText className="mr-2 h-4 w-4" />
                      {type}
                    </Button>
                  ))}
                </div>
              </div>
            </>
          )}
        </CardContent>

        <CardFooter className="flex flex-col space-y-2">
          <div className="flex w-full justify-between">
            {step > 1 ? (
              <Button variant="outline" onClick={handleBack}>
                Retour
              </Button>
            ) : (
              <div></div>
            )}
            <Button
              onClick={handleNext}
              disabled={!isStepValid()}
              className="space-x-2"
            >
              <span>{step === totalSteps ? "Terminer" : "Continuer"}</span>
              <ChevronRight className="h-4 w-4" />
            </Button>
          </div>
          {step === 1 && (
            <Button variant="link" className="w-full mt-2">
              Déjà un compte ? Se connecter
            </Button>
          )}
        </CardFooter>
      </Card>
    </div>
  );
};

export default AuthenticationFlow;
