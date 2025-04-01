import React from 'react';
import { Button } from '@/components/ui/button';
import { Camera, Gauge, RotateCw } from 'lucide-react';
import { Separator } from '@/components/ui/separator';

interface NavBarProps {
    handleCameraButton: () => void;
    handlePFDButton: () => void;
}

export const NavBar: React.FC<NavBarProps> = ({ handleCameraButton, handlePFDButton }) => {
    const handleReload = () => {
        window.location.reload();
    };

    return (
        <div className="flex flex-col gap-2 p-2">
            <Button
                variant="ghost"
                size="icon"
                onClick={handleReload}
                title="Reload Page"
                className="text-orange-500 hover:text-orange-600 hover:bg-orange-100/10"
            >
                <RotateCw className="h-5 w-5" />
            </Button>
            
            <Separator className="my-1 bg-border/50" />
            
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
