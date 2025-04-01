import React, { useEffect, useRef, useState } from 'react';
import {
    Config,
    AllSettings,
    PixelStreaming
} from '@epicgames-ps/lib-pixelstreamingfrontend-ue5.3';
import { cn } from '@/lib/utils';

export interface PixelStreamingWrapperProps {
    initialSettings?: Partial<AllSettings>;
    className?: string;
}

/**
 * UnrealViewer component provides a React wrapper around the Unreal Engine Pixel Streaming library.
 * It handles the initialization, cleanup, and user interaction with the pixel streaming instance.
 */
export const UnrealViewer: React.FC<PixelStreamingWrapperProps> = ({
    initialSettings,
    className
}) => {
    // Reference to the container element for the pixel streaming video
    const streamContainerRef = useRef<HTMLDivElement>(null);
    
    // Pixel streaming instance state
    const [pixelStreaming, setPixelStreaming] = useState<PixelStreaming>();
    
    // State to manage the visibility of the play overlay
    const [showPlayOverlay, setShowPlayOverlay] = useState(false);

    useEffect(() => {
        const container = streamContainerRef.current;
        if (!container) return;

        // Initialize pixel streaming with configuration
        const config = new Config({ initialSettings });
        const streamingInstance = new PixelStreaming(config, {
            videoElementParent: container
        });
        
        // Handle auto-play restrictions
        streamingInstance.addEventListener('playStreamRejected', () => {
            setShowPlayOverlay(true);
        });

        // Store instance in state for later access
        setPixelStreaming(streamingInstance);

        // Cleanup function
        return () => {
            try {
                streamingInstance.disconnect();
            } catch (error) {
                console.warn('Error during pixel streaming cleanup:', error);
            }
        };
    }, [initialSettings]);

    // Handle manual play interaction
    const handlePlay = async () => {
        if (pixelStreaming) {
            try {
                await pixelStreaming.play();
                setShowPlayOverlay(false);
            } catch (error) {
                console.error('Error playing stream:', error);
            }
        }
    };

    return (
        <div className={cn(
            "relative w-full h-full bg-background",
            className
        )}>
            {/* Streaming content container */}
            <div 
                ref={streamContainerRef}
                className="w-full h-full"
            />
            
            {/* Play overlay - shown when autoplay is rejected */}
            {showPlayOverlay && (
                <div 
                    className="absolute inset-0 flex items-center justify-center bg-black/50 cursor-pointer"
                    onClick={handlePlay}
                >
                    <div className="flex flex-col items-center gap-2">
                        <div className="p-4 rounded-full bg-primary/10 backdrop-blur-sm">
                            <PlayIcon className="w-8 h-8 text-primary" />
                        </div>
                        <span className="text-sm font-medium text-primary">
                            Click to play
                        </span>
                    </div>
                </div>
            )}
        </div>
    );
};

// Play icon component for the overlay
const PlayIcon = ({ className }: { className?: string }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <polygon points="5 3 19 12 5 21 5 3" />
    </svg>
);
