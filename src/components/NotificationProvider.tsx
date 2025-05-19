import React, { createContext, useContext } from "react";
import { toast } from "@/components/ui/use-toast";

type NotificationType = "success" | "error" | "info" | "warning";

interface NotificationContextType {
  showNotification: ({
    type,
    title,
    description,
  }: {
    type: NotificationType;
    title: string;
    description?: string;
  }) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(
  undefined,
);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error(
      "useNotification doit être utilisé à l'intérieur d'un NotificationProvider",
    );
  }
  return context;
};

export const NotificationProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const showNotification = ({
    type,
    title,
    description,
  }: {
    type: NotificationType;
    title: string;
    description?: string;
  }) => {
    const variant = type === "error" ? "destructive" : "default";

    toast({
      variant,
      title,
      description,
    });
  };

  return (
    <NotificationContext.Provider value={{ showNotification }}>
      {children}
    </NotificationContext.Provider>
  );
};
