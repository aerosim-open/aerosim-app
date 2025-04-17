import React from "react";
import { Button } from "@/components/ui/button";
import { Camera, Gauge, RotateCw } from "lucide-react";

interface NavBarProps {
  handleReload: () => void;
  handleCameraButton: () => void;
  handlePFDButton: () => void;
}

interface ButtonWrapperProps {
  handleButton: () => void;
  hoverText: string;
  text: string;
  Icon: any;
}

const ButtonWrapper: React.FC<ButtonWrapperProps> = ({
  handleButton,
  hoverText,
  text,
  Icon,
}: ButtonWrapperProps) => {
  return (
    <Button variant="ghost" onClick={handleButton} title={hoverText}>
      <div className="flex flex-col justify-center items-center">
        <Icon />
        <h2>{text}</h2>
      </div>
    </Button>
  );
};

export const NavBar: React.FC<NavBarProps> = ({
  handleReload,
  handleCameraButton,
  handlePFDButton,
}) => {
  return (
    <div>
      <ButtonWrapper
        handleButton={handleReload}
        hoverText="Reload Page"
        text="Reload"
        Icon={RotateCw}
      />

      <ButtonWrapper
        handleButton={handleCameraButton}
        hoverText="Toggle Camera View"
        text="Camera"
        Icon={Camera}
      />

      <ButtonWrapper
        handleButton={handlePFDButton}
        hoverText="Toggle PFD"
        text="PFD"
        Icon={Gauge}
      />
    </div>
  );
};
