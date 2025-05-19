import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Slider } from "@/components/ui/slider";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { Accessibility, ZoomIn, Type, MousePointer } from "lucide-react";

export function AccessibilityMenu() {
  const [fontSize, setFontSize] = useState(100);
  const [highContrast, setHighContrast] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [largePointer, setLargePointer] = useState(false);

  const applyAccessibilitySettings = () => {
    // Apply font size
    document.documentElement.style.fontSize = `${fontSize}%`;

    // Apply high contrast
    if (highContrast) {
      document.documentElement.classList.add("high-contrast");
    } else {
      document.documentElement.classList.remove("high-contrast");
    }

    // Apply reduced motion
    if (reducedMotion) {
      document.documentElement.classList.add("reduced-motion");
    } else {
      document.documentElement.classList.remove("reduced-motion");
    }

    // Apply large pointer
    if (largePointer) {
      document.documentElement.classList.add("large-pointer");
    } else {
      document.documentElement.classList.remove("large-pointer");
    }

    // Save settings to localStorage
    localStorage.setItem(
      "accessibility-settings",
      JSON.stringify({
        fontSize,
        highContrast,
        reducedMotion,
        largePointer,
      }),
    );
  };

  // Load settings on component mount
  React.useEffect(() => {
    const savedSettings = localStorage.getItem("accessibility-settings");
    if (savedSettings) {
      const settings = JSON.parse(savedSettings);
      setFontSize(settings.fontSize || 100);
      setHighContrast(settings.highContrast || false);
      setReducedMotion(settings.reducedMotion || false);
      setLargePointer(settings.largePointer || false);

      // Apply saved settings
      document.documentElement.style.fontSize = `${settings.fontSize || 100}%`;

      if (settings.highContrast) {
        document.documentElement.classList.add("high-contrast");
      }

      if (settings.reducedMotion) {
        document.documentElement.classList.add("reduced-motion");
      }

      if (settings.largePointer) {
        document.documentElement.classList.add("large-pointer");
      }
    }
  }, []);

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" className="rounded-full h-10 w-10">
          <Accessibility className="h-5 w-5" />
          <span className="sr-only">Options d'accessibilité</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Options d'accessibilité</DialogTitle>
          <DialogDescription>
            Personnalisez l'interface pour améliorer votre expérience.
          </DialogDescription>
        </DialogHeader>
        <div className="space-y-6 py-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <Type className="h-4 w-4" />
                <Label htmlFor="font-size">Taille du texte</Label>
              </div>
              <span className="text-sm">{fontSize}%</span>
            </div>
            <Slider
              id="font-size"
              min={75}
              max={200}
              step={5}
              value={[fontSize]}
              onValueChange={(value) => setFontSize(value[0])}
              onValueCommit={() => applyAccessibilitySettings()}
              aria-label="Taille du texte"
            />
          </div>

          <div className="flex items-center justify-between space-y-0">
            <div className="flex items-center space-x-2">
              <Label htmlFor="high-contrast">Contraste élevé</Label>
            </div>
            <Switch
              id="high-contrast"
              checked={highContrast}
              onCheckedChange={(checked) => {
                setHighContrast(checked);
                setTimeout(applyAccessibilitySettings, 0);
              }}
            />
          </div>

          <div className="flex items-center justify-between space-y-0">
            <div className="flex items-center space-x-2">
              <Label htmlFor="reduced-motion">Réduire les animations</Label>
            </div>
            <Switch
              id="reduced-motion"
              checked={reducedMotion}
              onCheckedChange={(checked) => {
                setReducedMotion(checked);
                setTimeout(applyAccessibilitySettings, 0);
              }}
            />
          </div>

          <div className="flex items-center justify-between space-y-0">
            <div className="flex items-center space-x-2">
              <MousePointer className="h-4 w-4" />
              <Label htmlFor="large-pointer">Curseur plus grand</Label>
            </div>
            <Switch
              id="large-pointer"
              checked={largePointer}
              onCheckedChange={(checked) => {
                setLargePointer(checked);
                setTimeout(applyAccessibilitySettings, 0);
              }}
            />
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
