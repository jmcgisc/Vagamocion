import React, { useCallback, useState } from 'react';
import { useConversation } from '@elevenlabs/react';

const AsistenteViaje = () => {
    // Estado para controlar si estamos conectados
    const [connectionStatus, setConnectionStatus] = useState('disconnected');

    const conversation = useConversation({
        // Configuración de callbacks
        onConnect: () => setConnectionStatus('connected'),
        onDisconnect: () => setConnectionStatus('disconnected'),
        onError: (error) => console.error('Error:', error),
    });

    const handleStartConversation = useCallback(async () => {
        try {
            // Solicitamos permiso del micrófono primero
            await navigator.mediaDevices.getUserMedia({ audio: true });

            // Iniciamos la conversación con tu ID de Agente
            await conversation.startSession({
                agentId: 'agent_7901kbc2eq98e6kvh3e102mds0re',
            });
        } catch (error) {
            console.error('Error al iniciar:', error);
        }
    }, [conversation]);

    const handleStopConversation = useCallback(async () => {
        await conversation.endSession();
    }, [conversation]);

    const isConnected = connectionStatus === 'connected';
    const isSpeaking = conversation.isSpeaking; // Detecta si la IA está hablando

    return (
        <div className="flex flex-col items-center justify-center gap-6 py-4">

            {/* Visualizador de Estado (Círculo animado) */}
            <div className={`relative flex items-center justify-center transition-all duration-500 ${isConnected ? 'w-32 h-32' : 'w-24 h-24'}`}>

                {/* Anillos de animación cuando habla la IA */}
                {isConnected && isSpeaking && (
                    <>
                        <div className="absolute inset-0 bg-blue-400 rounded-full opacity-20 animate-ping"></div>
                        <div className="absolute inset-0 bg-blue-300 rounded-full opacity-30 animate-pulse"></div>
                    </>
                )}

                {/* Círculo central */}
                <div className={`z-10 rounded-full flex items-center justify-center shadow-xl transition-colors duration-300
            ${isConnected
                        ? 'bg-gradient-to-br from-blue-500 to-indigo-600 w-full h-full'
                        : 'bg-gray-100 dark:bg-gray-800 w-full h-full border-2 border-gray-200 dark:border-gray-700'
                    }
        `}>
                    {isConnected ? (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-white animate-pulse" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                    ) : (
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11a7 7 0 01-7 7m0 0a7 7 0 01-7-7m7 7v4m0 0H8m4 0h4m-4-8a3 3 0 01-3-3V5a3 3 0 116 0v6a3 3 0 01-3 3z" />
                        </svg>
                    )}
                </div>
            </div>

            {/* Botones de Control */}
            <div className="flex flex-col items-center gap-3">
                {!isConnected ? (
                    <button
                        onClick={handleStartConversation}
                        className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-full shadow-lg transform transition hover:scale-105 flex items-center gap-2"
                    >
                        <span>Iniciar Conversación</span>
                    </button>
                ) : (
                    <div className="flex flex-col items-center gap-2">
                        <p className="text-sm text-green-600 font-medium animate-pulse">
                            {isSpeaking ? 'La IA está hablando...' : 'Escuchando...'}
                        </p>
                        <button
                            onClick={handleStopConversation}
                            className="text-red-500 hover:text-red-700 font-semibold text-sm underline mt-2"
                        >
                            Terminar llamada
                        </button>
                    </div>
                )}
            </div>

        </div>
    );
};

export default AsistenteViaje;