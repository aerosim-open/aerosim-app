import React, { useState, useEffect } from 'react';
import { AppStreamer, StreamEvent, StreamProps, DirectConfig } from '@nvidia/omniverse-webrtc-streaming-library';

interface AppStreamProps {
    server: string;
    width: number;
    height: number;
    fps: number;
}

export const OmniverseViewer : React.FC<AppStreamProps> = ( { server, width, height, fps} : AppStreamProps) => {

    const [requested, setRequested] = useState(false);
    const [streamReady, setStreamReady] = useState(false);

    useEffect(() => {
        if (!requested) {
            setRequested(true);

            let streamProps: StreamProps;
            let streamConfig: DirectConfig;
            let streamSource: 'direct';

            streamSource = 'direct';
            streamConfig = {
                videoElementId: 'remote-video',
                audioElementId: 'remote-audio',
                authenticate: false,
                maxReconnects: 20,
                server: server,
                nativeTouchEvents: true,
                width: width,
                height: height,
                fps: fps,
                onUpdate: (message: StreamEvent) => onUpdate(message),
                onStart: (message: StreamEvent) => onStart(message),
                onCustomEvent: (message: any) => onCustomEvent(message),
                onStop: (message: StreamEvent) => { console.log(message) },
                onTerminate: (message: StreamEvent) => { console.log(message) }
            };

            try {
                streamProps = {streamConfig, streamSource}
                AppStreamer.connect(streamProps)
                .then((result: StreamEvent) => {
                    console.info(result);
                })
                .catch((error: StreamEvent) => {
                    console.error(error);
                });
            }
            catch (error) {
                console.error(error);
            }
        }
    }, []);

    const onStart = (message: any) => {
        if (message.action === 'start' && message.status === 'success' && !streamReady) {
            console.info('streamReady');
            setStreamReady(true);
            console.log("Streaming has started.")
        }
    }

    const onUpdate = (message: any) =>{
        try {
            if (message.action === 'authUser' && message.status === 'success') {
                console.log(`User logged in: ${message.info}`)
            }
        } catch (error) {
            console.error(message);
        }
    }

    const onCustomEvent = (message: any) => {
        console.log(message)
    }

    return (
        <div className="relative w-full h-full bg-background">
            <video
                key={'video-canvas'}
                id={'remote-video'}
                style={{
                    left: 0,
                    top: 0,
                    width: '100%',
                    height: '100%',
                }}
                tabIndex={-1}
                playsInline muted
                autoPlay
            />
            <audio id="remote-audio" muted></audio>
        </div>
    );

}