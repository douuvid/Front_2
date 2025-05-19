import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Briefcase, MapPin, Save } from "lucide-react";

interface JobCriteriaFormProps {
  initialCriteria: {
    position: string;
    location: string;
    contractTypes: string[];
  };
  onSave: (criteria: {
    position: string;
    location: string;
    contractTypes: string[];
  }) => void;
  onCancel: () => void;
}

const CONTRACT_TYPES = [
  "CDI",
  "CDD",
  "Intérim",
  "Freelance",
  "Stage",
  "Alternance",
];

const JobCriteriaForm = ({
  initialCriteria,
  onSave,
  onCancel,
}: JobCriteriaFormProps) => {
  const [position, setPosition] = useState(initialCriteria.position);
  const [location, setLocation] = useState(initialCriteria.location);
  const [contractTypes, setContractTypes] = useState<string[]>(
    initialCriteria.contractTypes,
  );

  const handleContractTypeToggle = (type: string) => {
    if (contractTypes.includes(type)) {
      setContractTypes(contractTypes.filter((t) => t !== type));
    } else {
      setContractTypes([...contractTypes, type]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      position,
      location,
      contractTypes,
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-3">
        <div className="flex items-center gap-3">
          <div className="bg-muted rounded-full p-2">
            <Briefcase className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <Label htmlFor="position" className="text-xs text-muted-foreground">
              Poste
            </Label>
            <Input
              id="position"
              value={position}
              onChange={(e) => setPosition(e.target.value)}
              className="mt-1"
              placeholder="Ex: Développeur Web"
            />
          </div>
        </div>

        <div className="flex items-center gap-3">
          <div className="bg-muted rounded-full p-2">
            <MapPin className="h-4 w-4 text-muted-foreground" />
          </div>
          <div className="flex-1">
            <Label htmlFor="location" className="text-xs text-muted-foreground">
              Localisation
            </Label>
            <Input
              id="location"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="mt-1"
              placeholder="Ex: Paris (75)"
            />
          </div>
        </div>

        <div>
          <p className="text-xs text-muted-foreground mb-2">Types de contrat</p>
          <div className="grid grid-cols-2 gap-2">
            {CONTRACT_TYPES.map((type) => (
              <div key={type} className="flex items-center space-x-2">
                <Checkbox
                  id={`contract-${type}`}
                  checked={contractTypes.includes(type)}
                  onCheckedChange={() => handleContractTypeToggle(type)}
                />
                <Label
                  htmlFor={`contract-${type}`}
                  className="text-sm font-normal"
                >
                  {type}
                </Label>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end space-x-2 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Annuler
        </Button>
        <Button type="submit" className="gap-1">
          <Save className="h-4 w-4" />
          Enregistrer
        </Button>
      </div>
    </form>
  );
};

export default JobCriteriaForm;
