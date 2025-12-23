// src/components/ElevenLabsWidget.jsx
import React, { useEffect } from 'react';

const ElevenLabsWidget = () => {
    useEffect(() => {
        // Evitar cargar el script duplicado si ya existe
        const existingScript = document.querySelector(`script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]`);

        if (!existingScript) {
            const script = document.createElement('script');
            script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
            script.async = true;
            script.type = "text/javascript";
            document.body.appendChild(script);
        }
    }, []);

    return (
        // React 19 maneja nativamente los Custom Elements, así que esto funciona directo
        <elevenlabs-convai agent-id="agent_7901kbc2eq98e6kvh3e102mds0re"></elevenlabs-convai>
    );
};

export default ElevenLabsWidget;