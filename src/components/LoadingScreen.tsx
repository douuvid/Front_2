import React from "react";
import LoadingSpinner from "./LoadingSpinner";

interface LoadingScreenProps {
  message?: string;
}

const LoadingScreen = ({ message = "Chargement..." }: LoadingScreenProps) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
      <div className="flex flex-col items-center">
        <LoadingSpinner size="large" className="mb-4" />
        <p className="text-muted-foreground">{message}</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
