import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Plus,
  Trash2,
  Download,
  Upload,
  FileText,
  Briefcase,
  GraduationCap,
  Award,
  X,
} from "lucide-react";

interface CVBuilderProps {
  initialCV?: {
    personalInfo: {
      name: string;
      email: string;
      phone: string;
      location: string;
    };
    summary: string;
    experience: Array<{
      id: string;
      title: string;
      company: string;
      location: string;
      startDate: string;
      endDate: string;
      description: string;
    }>;
    education: Array<{
      id: string;
      degree: string;
      institution: string;
      location: string;
      startDate: string;
      endDate: string;
      description: string;
    }>;
    skills: string[];
  };
  onSave?: (cv: any) => void;
}

const CVBuilder = ({
  initialCV = {
    personalInfo: {
      name: "Thomas Dubois",
      email: "thomas.dubois@example.com",
      phone: "06 12 34 56 78",
      location: "Paris, France",
    },
    summary:
      "Développeur web full-stack avec 5 ans d'expérience dans la création d'applications web modernes et réactives. Spécialisé en React, Node.js et TypeScript.",
    experience: [
      {
        id: "exp1",
        title: "Développeur Frontend",
        company: "Tech Solutions",
        location: "Paris",
        startDate: "2021-01",
        endDate: "Présent",
        description:
          "Développement d'interfaces utilisateur réactives avec React et TypeScript. Collaboration avec les designers pour implémenter des maquettes fidèles.",
      },
      {
        id: "exp2",
        title: "Développeur Web",
        company: "Digital Agency",
        location: "Lyon",
        startDate: "2019-03",
        endDate: "2020-12",
        description:
          "Création de sites web et d'applications pour divers clients. Utilisation de technologies modernes comme React, Vue.js et Node.js.",
      },
    ],
    education: [
      {
        id: "edu1",
        degree: "Master en Informatique",
        institution: "Université de Paris",
        location: "Paris",
        startDate: "2017-09",
        endDate: "2019-06",
        description:
          "Spécialisation en développement web et applications mobiles.",
      },
    ],
    skills: [
      "React",
      "TypeScript",
      "Node.js",
      "JavaScript",
      "HTML/CSS",
      "Git",
      "MongoDB",
      "SQL",
    ],
  },
  onSave = () => {},
}: CVBuilderProps) => {
  const [cv, setCV] = useState(initialCV);
  const [activeTab, setActiveTab] = useState("personal");
  const [newSkill, setNewSkill] = useState("");

  const handlePersonalInfoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setCV({
      ...cv,
      personalInfo: {
        ...cv.personalInfo,
        [name]: value,
      },
    });
  };

  const handleSummaryChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setCV({
      ...cv,
      summary: e.target.value,
    });
  };

  const handleExperienceChange = (id: string, field: string, value: string) => {
    setCV({
      ...cv,
      experience: cv.experience.map((exp) =>
        exp.id === id ? { ...exp, [field]: value } : exp,
      ),
    });
  };

  const handleEducationChange = (id: string, field: string, value: string) => {
    setCV({
      ...cv,
      education: cv.education.map((edu) =>
        edu.id === id ? { ...edu, [field]: value } : edu,
      ),
    });
  };

  const addExperience = () => {
    const newExp = {
      id: `exp${Date.now()}`,
      title: "",
      company: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    setCV({
      ...cv,
      experience: [...cv.experience, newExp],
    });
  };

  const removeExperience = (id: string) => {
    setCV({
      ...cv,
      experience: cv.experience.filter((exp) => exp.id !== id),
    });
  };

  const addEducation = () => {
    const newEdu = {
      id: `edu${Date.now()}`,
      degree: "",
      institution: "",
      location: "",
      startDate: "",
      endDate: "",
      description: "",
    };
    setCV({
      ...cv,
      education: [...cv.education, newEdu],
    });
  };

  const removeEducation = (id: string) => {
    setCV({
      ...cv,
      education: cv.education.filter((edu) => edu.id !== id),
    });
  };

  const addSkill = () => {
    if (newSkill.trim() && !cv.skills.includes(newSkill.trim())) {
      setCV({
        ...cv,
        skills: [...cv.skills, newSkill.trim()],
      });
      setNewSkill("");
    }
  };

  const removeSkill = (skill: string) => {
    setCV({
      ...cv,
      skills: cv.skills.filter((s) => s !== skill),
    });
  };

  const handleSaveCV = () => {
    onSave(cv);
  };

  return (
    <Card className="w-full border-none shadow-md">
      <CardHeader>
        <div className="flex justify-between items-center">
          <CardTitle className="text-xl">Éditeur de CV</CardTitle>
          <div className="flex gap-2">
            <Button variant="outline" size="sm">
              <Upload className="h-4 w-4 mr-1" />
              Importer
            </Button>
            <Button size="sm" onClick={handleSaveCV}>
              <Download className="h-4 w-4 mr-1" />
              Exporter
            </Button>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid grid-cols-4 mb-4">
            <TabsTrigger value="personal">Informations</TabsTrigger>
            <TabsTrigger value="experience">Expérience</TabsTrigger>
            <TabsTrigger value="education">Formation</TabsTrigger>
            <TabsTrigger value="skills">Compétences</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="space-y-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  name="name"
                  value={cv.personalInfo.name}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={cv.personalInfo.email}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <Input
                  id="phone"
                  name="phone"
                  value={cv.personalInfo.phone}
                  onChange={handlePersonalInfoChange}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="location">Localisation</Label>
                <Input
                  id="location"
                  name="location"
                  value={cv.personalInfo.location}
                  onChange={handlePersonalInfoChange}
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="summary">Résumé professionnel</Label>
              <Textarea
                id="summary"
                rows={4}
                value={cv.summary}
                onChange={handleSummaryChange}
                className="resize-none"
              />
            </div>
          </TabsContent>

          <TabsContent value="experience" className="space-y-4">
            <ScrollArea className="h-[400px] pr-4">
              {cv.experience.map((exp, index) => (
                <div
                  key={exp.id}
                  className="border rounded-md p-4 mb-4 relative"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-7 w-7"
                    onClick={() => removeExperience(exp.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>

                  <div className="flex items-center gap-2 mb-3">
                    <Briefcase className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-medium">Expérience {index + 1}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="space-y-2">
                      <Label htmlFor={`title-${exp.id}`}>Poste</Label>
                      <Input
                        id={`title-${exp.id}`}
                        value={exp.title}
                        onChange={(e) =>
                          handleExperienceChange(
                            exp.id,
                            "title",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`company-${exp.id}`}>Entreprise</Label>
                      <Input
                        id={`company-${exp.id}`}
                        value={exp.company}
                        onChange={(e) =>
                          handleExperienceChange(
                            exp.id,
                            "company",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`location-${exp.id}`}>Lieu</Label>
                      <Input
                        id={`location-${exp.id}`}
                        value={exp.location}
                        onChange={(e) =>
                          handleExperienceChange(
                            exp.id,
                            "location",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor={`startDate-${exp.id}`}>Début</Label>
                        <Input
                          id={`startDate-${exp.id}`}
                          value={exp.startDate}
                          onChange={(e) =>
                            handleExperienceChange(
                              exp.id,
                              "startDate",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`endDate-${exp.id}`}>Fin</Label>
                        <Input
                          id={`endDate-${exp.id}`}
                          value={exp.endDate}
                          onChange={(e) =>
                            handleExperienceChange(
                              exp.id,
                              "endDate",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`description-${exp.id}`}>Description</Label>
                    <Textarea
                      id={`description-${exp.id}`}
                      rows={3}
                      value={exp.description}
                      onChange={(e) =>
                        handleExperienceChange(
                          exp.id,
                          "description",
                          e.target.value,
                        )
                      }
                      className="resize-none"
                    />
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={addExperience}
              >
                <Plus className="h-4 w-4 mr-1" />
                Ajouter une expérience
              </Button>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="education" className="space-y-4">
            <ScrollArea className="h-[400px] pr-4">
              {cv.education.map((edu, index) => (
                <div
                  key={edu.id}
                  className="border rounded-md p-4 mb-4 relative"
                >
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute top-2 right-2 h-7 w-7"
                    onClick={() => removeEducation(edu.id)}
                  >
                    <Trash2 className="h-4 w-4 text-red-500" />
                  </Button>

                  <div className="flex items-center gap-2 mb-3">
                    <GraduationCap className="h-5 w-5 text-muted-foreground" />
                    <h3 className="font-medium">Formation {index + 1}</h3>
                  </div>

                  <div className="grid grid-cols-2 gap-3 mb-3">
                    <div className="space-y-2">
                      <Label htmlFor={`degree-${edu.id}`}>Diplôme</Label>
                      <Input
                        id={`degree-${edu.id}`}
                        value={edu.degree}
                        onChange={(e) =>
                          handleEducationChange(
                            edu.id,
                            "degree",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`institution-${edu.id}`}>
                        Institution
                      </Label>
                      <Input
                        id={`institution-${edu.id}`}
                        value={edu.institution}
                        onChange={(e) =>
                          handleEducationChange(
                            edu.id,
                            "institution",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor={`location-${edu.id}`}>Lieu</Label>
                      <Input
                        id={`location-${edu.id}`}
                        value={edu.location}
                        onChange={(e) =>
                          handleEducationChange(
                            edu.id,
                            "location",
                            e.target.value,
                          )
                        }
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-2">
                      <div className="space-y-2">
                        <Label htmlFor={`startDate-${edu.id}`}>Début</Label>
                        <Input
                          id={`startDate-${edu.id}`}
                          value={edu.startDate}
                          onChange={(e) =>
                            handleEducationChange(
                              edu.id,
                              "startDate",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor={`endDate-${edu.id}`}>Fin</Label>
                        <Input
                          id={`endDate-${edu.id}`}
                          value={edu.endDate}
                          onChange={(e) =>
                            handleEducationChange(
                              edu.id,
                              "endDate",
                              e.target.value,
                            )
                          }
                        />
                      </div>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor={`description-${edu.id}`}>Description</Label>
                    <Textarea
                      id={`description-${edu.id}`}
                      rows={3}
                      value={edu.description}
                      onChange={(e) =>
                        handleEducationChange(
                          edu.id,
                          "description",
                          e.target.value,
                        )
                      }
                      className="resize-none"
                    />
                  </div>
                </div>
              ))}

              <Button
                variant="outline"
                className="w-full mt-2"
                onClick={addEducation}
              >
                <Plus className="h-4 w-4 mr-1" />
                Ajouter une formation
              </Button>
            </ScrollArea>
          </TabsContent>

          <TabsContent value="skills" className="space-y-4">
            <div className="space-y-4">
              <div className="flex gap-2">
                <div className="flex-1">
                  <Input
                    placeholder="Ajouter une compétence"
                    value={newSkill}
                    onChange={(e) => setNewSkill(e.target.value)}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        e.preventDefault();
                        addSkill();
                      }
                    }}
                  />
                </div>
                <Button onClick={addSkill}>
                  <Plus className="h-4 w-4 mr-1" />
                  Ajouter
                </Button>
              </div>

              <div className="border rounded-md p-4">
                <div className="flex items-center gap-2 mb-3">
                  <Award className="h-5 w-5 text-muted-foreground" />
                  <h3 className="font-medium">Compétences</h3>
                </div>

                <div className="flex flex-wrap gap-2">
                  {cv.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="pl-2 pr-1 py-1.5 flex items-center gap-1"
                    >
                      {skill}
                      <Button
                        variant="ghost"
                        size="icon"
                        className="h-4 w-4 ml-1"
                        onClick={() => removeSkill(skill)}
                      >
                        <X className="h-3 w-3" />
                      </Button>
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSaveCV}>
            <FileText className="h-4 w-4 mr-1" />
            Enregistrer le CV
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default CVBuilder;
