import { Suspense, useState, useEffect } from "react";
import { useRoutes, Routes, Route, Navigate } from "react-router-dom";
import Home from "./components/home";
import Dashboard from "./components/Dashboard";
import OnboardingScreen from "./components/OnboardingScreen";
import FirstTimeSetup from "./components/FirstTimeSetup";
import routes from "tempo-routes";
import { ThemeProvider } from "./components/ThemeProvider";
import { NotificationProvider } from "./components/NotificationProvider";
import { Toaster } from "./components/ui/toaster";
import ErrorBoundary from "./components/ErrorBoundary";
import LoadingScreen from "./components/LoadingScreen";

function App() {
  // Check if the user has completed the first-time setup
  const [hasCompletedSetup, setHasCompletedSetup] = useState<boolean>(() => {
    const savedValue = localStorage.getItem("hasCompletedSetup");
    return savedValue ? JSON.parse(savedValue) : false;
  });

  // Save the setup completion status to localStorage
  useEffect(() => {
    localStorage.setItem(
      "hasCompletedSetup",
      JSON.stringify(hasCompletedSetup),
    );
  }, [hasCompletedSetup]);

  const handleSetupComplete = (criteria: {
    position: string;
    location: string;
    contractTypes: string[];
  }) => {
    // Save the job criteria to localStorage
    localStorage.setItem("jobCriteria", JSON.stringify(criteria));
    // Mark setup as completed
    setHasCompletedSetup(true);
  };

  return (
    <ErrorBoundary>
      <ThemeProvider defaultTheme="system" storageKey="france-travail-theme">
        <NotificationProvider>
          <Suspense
            fallback={
              <LoadingScreen message="Chargement de l'application..." />
            }
          >
            <>
              <Routes>
                <Route path="/" element={<Home />} />
                <Route
                  path="/dashboard"
                  element={
                    hasCompletedSetup ? (
                      <Dashboard />
                    ) : (
                      <Navigate to="/onboarding" />
                    )
                  }
                />
                <Route path="/onboarding" element={<OnboardingScreen />} />
                <Route path="*" element={<Navigate to="/" replace />} />
              </Routes>
              {import.meta.env.VITE_TEMPO === "true" && useRoutes(routes)}
              <Toaster />
            </>
          </Suspense>
        </NotificationProvider>
      </ThemeProvider>
    </ErrorBoundary>
  );
}

export default App;
