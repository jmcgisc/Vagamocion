// src/components/AiAssistantButton.jsx
import React, { useState, useEffect } from 'react';
import { FaMicrophone } from 'react-icons/fa'; // Asegúrate de tener react-icons instalado

const AiAssistantButton = () => {
    const [isActive, setIsActive] = useState(false);

    // 1. Efecto para cargar el script de ElevenLabs (solo una vez)
    useEffect(() => {
        if (isActive) {
            const existingScript = document.querySelector(`script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]`);

            if (!existingScript) {
                const script = document.createElement('script');
                script.src = "https://unpkg.com/@elevenlabs/convai-widget-embed";
                script.async = true;
                script.type = "text/javascript";
                document.body.appendChild(script);
            }
        }
    }, [isActive]);

    // 2. Manejador del clic
    const handleStartAgent = () => {
        setIsActive(true);
    };

    return (
        <div className="fixed bottom-6 right-6 z-50 flex flex-col items-end">

            {/* Opción A: Si el agente NO está activo, mostramos TU botón personalizado */}
            {!isActive && (
                <button
                    onClick={handleStartAgent}
                    className="flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-full shadow-lg transition-all transform hover:scale-105"
                >
                    <FaMicrophone className="text-lg" />
                    <span>Hablar con Asesor IA</span>
                </button>
            )}

            {/* Opción B: Si el agente ESTÁ activo, renderizamos el widget de ElevenLabs */}
            {isActive && (
                <div className="animate-fade-in-up">
                    {/* El widget suele renderizarse como una burbuja flotante. 
                Al montarlo aquí, aparecerá y tomará el control. */}
                    <elevenlabs-convai agent-id="agent_7901kbc2eq98e6kvh3e102mds0re"></elevenlabs-convai>
                </div>
            )}
        </div>
    );
};

export default AiAssistantButton;