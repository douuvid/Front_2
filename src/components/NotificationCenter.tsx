import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Bell, CheckCircle, X, Info, Calendar } from "lucide-react";
import { ScrollArea } from "@/components/ui/scroll-area";
import { motion, AnimatePresence } from "framer-motion";

interface Notification {
  id: string;
  type: "application" | "interview" | "info";
  title: string;
  message: string;
  date: string;
  read: boolean;
}

interface NotificationCenterProps {
  notifications?: Notification[];
  onMarkAsRead?: (id: string) => void;
  onMarkAllAsRead?: () => void;
  onDismiss?: (id: string) => void;
}

const NotificationCenter = ({
  notifications = [
    {
      id: "1",
      type: "application",
      title: "Candidature envoyée",
      message:
        "Votre candidature pour le poste de Développeur Frontend a été envoyée avec succès.",
      date: "Il y a 2 heures",
      read: false,
    },
    {
      id: "2",
      type: "interview",
      title: "Entretien programmé",
      message:
        "Vous avez un entretien pour le poste de UX Designer le 20 juin à 14h00.",
      date: "Il y a 1 jour",
      read: false,
    },
    {
      id: "3",
      type: "info",
      title: "Mise à jour du système",
      message:
        "Notre système a été mis à jour pour améliorer la détection des offres correspondant à vos critères.",
      date: "Il y a 3 jours",
      read: true,
    },
  ],
  onMarkAsRead = () => {},
  onMarkAllAsRead = () => {},
  onDismiss = () => {},
}: NotificationCenterProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const unreadCount = notifications.filter((n) => !n.read).length;

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case "application":
        return <CheckCircle className="h-5 w-5 text-green-500" />;
      case "interview":
        return <Calendar className="h-5 w-5 text-blue-500" />;
      case "info":
      default:
        return <Info className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="icon"
        className="relative rounded-full h-10 w-10"
        onClick={() => setIsOpen(!isOpen)}
      >
        <Bell className="h-5 w-5" />
        {unreadCount > 0 && (
          <span className="absolute top-0 right-0 h-4 w-4 bg-red-500 rounded-full text-[10px] flex items-center justify-center text-white">
            {unreadCount}
          </span>
        )}
      </Button>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 10 }}
            transition={{ duration: 0.2 }}
            className="absolute right-0 mt-2 w-80 z-50"
          >
            <Card className="border shadow-lg">
              <CardHeader className="pb-2 pt-4 px-4">
                <div className="flex justify-between items-center">
                  <CardTitle className="text-base">Notifications</CardTitle>
                  {unreadCount > 0 && (
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-8 text-xs"
                      onClick={() => {
                        onMarkAllAsRead();
                      }}
                    >
                      Tout marquer comme lu
                    </Button>
                  )}
                </div>
              </CardHeader>
              <CardContent className="p-0">
                {notifications.length === 0 ? (
                  <div className="py-6 text-center text-muted-foreground">
                    Aucune notification
                  </div>
                ) : (
                  <ScrollArea className="h-[300px]">
                    <div className="divide-y">
                      {notifications.map((notification) => (
                        <div
                          key={notification.id}
                          className={`p-4 flex gap-3 ${!notification.read ? "bg-muted/30" : ""}`}
                        >
                          <div className="flex-shrink-0 mt-1">
                            {getNotificationIcon(notification.type)}
                          </div>
                          <div className="flex-1">
                            <div className="flex justify-between items-start">
                              <h4 className="text-sm font-medium">
                                {notification.title}
                              </h4>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-6 w-6"
                                onClick={() => onDismiss(notification.id)}
                              >
                                <X className="h-3 w-3" />
                              </Button>
                            </div>
                            <p className="text-xs text-muted-foreground mt-1">
                              {notification.message}
                            </p>
                            <div className="flex justify-between items-center mt-2">
                              <span className="text-xs text-muted-foreground">
                                {notification.date}
                              </span>
                              {!notification.read && (
                                <Button
                                  variant="ghost"
                                  size="sm"
                                  className="h-6 text-xs"
                                  onClick={() => onMarkAsRead(notification.id)}
                                >
                                  Marquer comme lu
                                </Button>
                              )}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                )}
              </CardContent>
            </Card>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default NotificationCenter;
