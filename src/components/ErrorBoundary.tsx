import React, { Component, ErrorInfo, ReactNode } from "react";
import { Button } from "@/components/ui/button";
import { AlertTriangle, RefreshCw } from "lucide-react";

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<Props, State> {
  public state: State = {
    hasError: false,
    error: null,
  };

  public static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error };
  }

  public componentDidCatch(error: Error, errorInfo: ErrorInfo) {
    console.error("Uncaught error:", error, errorInfo);
  }

  public render() {
    if (this.state.hasError) {
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-screen flex flex-col items-center justify-center p-4 bg-background">
          <div className="max-w-md w-full p-6 bg-card rounded-lg shadow-lg border text-center">
            <div className="flex justify-center mb-4">
              <div className="h-16 w-16 bg-red-100 dark:bg-red-900/20 rounded-full flex items-center justify-center">
                <AlertTriangle className="h-8 w-8 text-red-600 dark:text-red-400" />
              </div>
            </div>
            <h1 className="text-xl font-bold mb-2">Une erreur est survenue</h1>
            <p className="text-muted-foreground mb-6">
              Nous sommes désolés, une erreur inattendue s'est produite.
            </p>
            <div className="text-left bg-muted p-3 rounded-md mb-6 overflow-auto max-h-32">
              <code className="text-xs">{this.state.error?.toString()}</code>
            </div>
            <Button onClick={() => window.location.reload()} className="w-full">
              <RefreshCw className="mr-2 h-4 w-4" />
              Rafraîchir la page
            </Button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
