import React from "react";
import { Button } from "@/components/ui/button";
import { Camera, Gauge, RotateCw } from "lucide-react";

interface NavBarProps {
  handleReload: () => void;
  handleCameraButton: () => void;
  handlePFDButton: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({
  handleReload,
  handleCameraButton,
  handlePFDButton,
}) => {
  return (
    <div className="flex flex-row gap-2">
      <Button
        variant="ghost"
        size="icon"
        onClick={handleReload}
        title="Reload Page"
        className="text-orange-500 hover:text-orange-600 hover:bg-orange-100/10"
      >
        <RotateCw className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={handleCameraButton}
        title="Toggle Camera View"
      >
        <Camera className="h-5 w-5" />
      </Button>

      <Button
        variant="ghost"
        size="icon"
        onClick={handlePFDButton}
        title="Toggle PFD"
      >
        <Gauge className="h-5 w-5" />
      </Button>
    </div>
  );
};
