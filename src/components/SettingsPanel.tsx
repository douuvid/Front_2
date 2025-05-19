import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Switch } from "@/components/ui/switch";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Separator } from "@/components/ui/separator";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  Bell,
  Lock,
  User,
  Mail,
  Smartphone,
  Eye,
  EyeOff,
  Save,
} from "lucide-react";

interface SettingsPanelProps {
  user?: {
    name: string;
    email: string;
    phone: string;
  };
  notifications?: {
    email: boolean;
    push: boolean;
    newOffers: boolean;
    applicationUpdates: boolean;
    interviews: boolean;
  };
  privacy?: {
    profileVisibility: "public" | "private" | "contacts";
    shareApplicationData: boolean;
    allowRecruitersToContact: boolean;
  };
  onSave?: (settings: any) => void;
}

const SettingsPanel = ({
  user = {
    name: "Thomas Dubois",
    email: "thomas.dubois@example.com",
    phone: "06 12 34 56 78",
  },
  notifications = {
    email: true,
    push: true,
    newOffers: true,
    applicationUpdates: true,
    interviews: true,
  },
  privacy = {
    profileVisibility: "contacts" as const,
    shareApplicationData: false,
    allowRecruitersToContact: true,
  },
  onSave = () => {},
}: SettingsPanelProps) => {
  const [userData, setUserData] = useState(user);
  const [notificationSettings, setNotificationSettings] =
    useState(notifications);
  const [privacySettings, setPrivacySettings] = useState(privacy);
  const [currentPassword, setCurrentPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const handleUserDataChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUserData({
      ...userData,
      [name]: value,
    });
  };

  const handleNotificationToggle = (setting: string) => {
    setNotificationSettings({
      ...notificationSettings,
      [setting]:
        !notificationSettings[setting as keyof typeof notificationSettings],
    });
  };

  const handlePrivacyToggle = (setting: string) => {
    setPrivacySettings({
      ...privacySettings,
      [setting]: !privacySettings[setting as keyof typeof privacySettings],
    });
  };

  const handleProfileVisibilityChange = (value: string) => {
    setPrivacySettings({
      ...privacySettings,
      profileVisibility: value as "public" | "private" | "contacts",
    });
  };

  const handleSaveSettings = () => {
    onSave({
      user: userData,
      notifications: notificationSettings,
      privacy: privacySettings,
    });
  };

  const handleChangePassword = () => {
    // Password validation and change logic would go here
    if (newPassword !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }

    if (newPassword.length < 8) {
      alert("Le mot de passe doit contenir au moins 8 caractères");
      return;
    }

    // Reset fields after successful change
    setCurrentPassword("");
    setNewPassword("");
    setConfirmPassword("");
    alert("Mot de passe modifié avec succès");
  };

  return (
    <Card className="w-full border-none shadow-md">
      <CardHeader>
        <CardTitle className="text-xl">Paramètres</CardTitle>
      </CardHeader>
      <CardContent>
        <Tabs defaultValue="account">
          <TabsList className="grid grid-cols-3 mb-4">
            <TabsTrigger value="account" className="flex items-center gap-1">
              <User className="h-4 w-4" />
              Compte
            </TabsTrigger>
            <TabsTrigger
              value="notifications"
              className="flex items-center gap-1"
            >
              <Bell className="h-4 w-4" />
              Notifications
            </TabsTrigger>
            <TabsTrigger value="privacy" className="flex items-center gap-1">
              <Lock className="h-4 w-4" />
              Confidentialité
            </TabsTrigger>
          </TabsList>

          <TabsContent value="account" className="space-y-4">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nom complet</Label>
                <Input
                  id="name"
                  name="name"
                  value={userData.name}
                  onChange={handleUserDataChange}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    name="email"
                    type="email"
                    value={userData.email}
                    onChange={handleUserDataChange}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="phone">Téléphone</Label>
                <div className="flex items-center gap-2">
                  <Smartphone className="h-4 w-4 text-muted-foreground" />
                  <Input
                    id="phone"
                    name="phone"
                    value={userData.phone}
                    onChange={handleUserDataChange}
                  />
                </div>
              </div>
            </div>

            <Separator className="my-4" />

            <div className="space-y-4">
              <h3 className="text-lg font-medium">Changer le mot de passe</h3>

              <div className="space-y-2">
                <Label htmlFor="currentPassword">Mot de passe actuel</Label>
                <div className="relative">
                  <Input
                    id="currentPassword"
                    type={showPassword ? "text" : "password"}
                    value={currentPassword}
                    onChange={(e) => setCurrentPassword(e.target.value)}
                  />
                  <Button
                    variant="ghost"
                    size="icon"
                    className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? (
                      <EyeOff className="h-4 w-4" />
                    ) : (
                      <Eye className="h-4 w-4" />
                    )}
                  </Button>
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="newPassword">Nouveau mot de passe</Label>
                <Input
                  id="newPassword"
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="confirmPassword">
                  Confirmer le mot de passe
                </Label>
                <Input
                  id="confirmPassword"
                  type={showPassword ? "text" : "password"}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
              </div>

              <Button onClick={handleChangePassword}>
                Changer le mot de passe
              </Button>
            </div>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Préférences de notification
              </h3>

              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notifications par email</p>
                    <p className="text-sm text-muted-foreground">
                      Recevoir des notifications par email
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.email}
                    onCheckedChange={() => handleNotificationToggle("email")}
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Notifications push</p>
                    <p className="text-sm text-muted-foreground">
                      Recevoir des notifications sur votre appareil
                    </p>
                  </div>
                  <Switch
                    checked={notificationSettings.push}
                    onCheckedChange={() => handleNotificationToggle("push")}
                  />
                </div>

                <Separator className="my-2" />

                <h4 className="font-medium">Types de notifications</h4>

                <div className="flex items-center justify-between">
                  <p>Nouvelles offres d'emploi</p>
                  <Switch
                    checked={notificationSettings.newOffers}
                    onCheckedChange={() =>
                      handleNotificationToggle("newOffers")
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p>Mises à jour des candidatures</p>
                  <Switch
                    checked={notificationSettings.applicationUpdates}
                    onCheckedChange={() =>
                      handleNotificationToggle("applicationUpdates")
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <p>Entretiens et rendez-vous</p>
                  <Switch
                    checked={notificationSettings.interviews}
                    onCheckedChange={() =>
                      handleNotificationToggle("interviews")
                    }
                  />
                </div>
              </div>
            </div>
          </TabsContent>

          <TabsContent value="privacy" className="space-y-4">
            <div className="space-y-4">
              <h3 className="text-lg font-medium">
                Paramètres de confidentialité
              </h3>

              <div className="space-y-3">
                <div className="space-y-2">
                  <Label htmlFor="profileVisibility">
                    Visibilité du profil
                  </Label>
                  <Select
                    value={privacySettings.profileVisibility}
                    onValueChange={handleProfileVisibilityChange}
                  >
                    <SelectTrigger id="profileVisibility">
                      <SelectValue placeholder="Sélectionner une option" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="public">Public</SelectItem>
                      <SelectItem value="contacts">
                        Contacts uniquement
                      </SelectItem>
                      <SelectItem value="private">Privé</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">
                      Partager les données de candidature
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Autoriser le partage anonyme des données pour améliorer le
                      service
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.shareApplicationData}
                    onCheckedChange={() =>
                      handlePrivacyToggle("shareApplicationData")
                    }
                  />
                </div>

                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">Contact par les recruteurs</p>
                    <p className="text-sm text-muted-foreground">
                      Autoriser les recruteurs à vous contacter directement
                    </p>
                  </div>
                  <Switch
                    checked={privacySettings.allowRecruitersToContact}
                    onCheckedChange={() =>
                      handlePrivacyToggle("allowRecruitersToContact")
                    }
                  />
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>

        <div className="flex justify-end mt-6">
          <Button onClick={handleSaveSettings}>
            <Save className="h-4 w-4 mr-1" />
            Enregistrer les modifications
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default SettingsPanel;
