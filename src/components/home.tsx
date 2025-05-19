import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "./ui/button";
import { Card, CardContent } from "./ui/card";
import OnboardingScreen from "./OnboardingScreen";
import Dashboard from "./Dashboard";

const Home = () => {
  const navigate = useNavigate();
  const hasCompletedSetup =
    localStorage.getItem("hasCompletedSetup") === "true";

  useEffect(() => {
    // If the user has completed setup, redirect to dashboard
    if (hasCompletedSetup) {
      navigate("/dashboard");
    }
  }, [hasCompletedSetup, navigate]);

  // If not completed setup, show onboarding
  return hasCompletedSetup ? <Dashboard /> : <OnboardingScreen />;
};

export default Home;
