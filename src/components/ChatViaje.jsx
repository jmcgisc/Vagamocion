import { useState, useRef, useEffect } from "react";

export default function ChatViaje({ onClose }) {
    // Estado para los mensajes del chat
    const [messages, setMessages] = useState([
        { type: "bot", text: "¡Hola! Soy Karina, tu asistente de viajes. ✈️ ¿A qué destino te gustaría viajar?" }
    ]);
    const [inputValue, setInputValue] = useState("");
    const [loading, setLoading] = useState(false);

    // Estado para recolectar los datos que pide tu n8n
    const [formData, setFormData] = useState({
        destino: "",
        ubicacion_actual: "",
        Fecha_inicioviaje: "",
        Fecha_regresoviaje: "",
        Actividades: "",
        Correo_electronico: ""
    });

    // Controla en qué paso de la recolección de datos estamos
    const [step, setStep] = useState(0);

    const messagesEndRef = useRef(null);

    // Auto-scroll al final del chat
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };
    useEffect(scrollToBottom, [messages]);

    const handleSend = async () => {
        if (!inputValue.trim()) return;

        // 1. Agregar mensaje del usuario
        const userText = inputValue;
        setMessages(prev => [...prev, { type: "user", text: userText }]);
        setInputValue("");

        // 2. Lógica de pasos para llenar el formData
        // Basado en tu JSON de n8n: destino, ubicacion_actual, fechas, actividades, correo

        let nextStep = step + 1;
        let botResponse = "";
        let newData = { ...formData };

        switch (step) {
            case 0: // Captura Destino
                newData.destino = userText;
                botResponse = `¡${userText} suena increíble! 🌍 ¿Desde qué ciudad o aeropuerto sales? (Ubicación actual)`;
                break;
            case 1: // Captura Origen
                newData.ubicacion_actual = userText;
                botResponse = "¿Qué fecha te gustaría iniciar tu viaje? (Ej: 2025-10-14)";
                break;
            case 2: // Captura Fecha Inicio
                newData.Fecha_inicioviaje = userText;
                botResponse = "¿Y cuándo te gustaría regresar? (Ej: 2025-10-20)";
                break;
            case 3: // Captura Fecha Regreso
                newData.Fecha_regresoviaje = userText;
                botResponse = "¿Qué tipo de actividades te gustan? (Ej: Museos, Playa, Montaña, Gastronomía)";
                break;
            case 4: // Captura Actividades
                newData.Actividades = userText;
                botResponse = "Por último, ¿a qué correo electrónico te envío la cotización completa? 📧";
                break;
            case 5: // Captura Correo y ENVÍA A N8N
                newData.Correo_electronico = userText;
                setFormData(newData);
                setLoading(true);

                // Simular mensaje de espera
                setMessages(prev => [...prev, { type: "bot", text: "Perfecto. Estoy buscando vuelos, hoteles y creando tu itinerario. Esto puede tomar unos segundos... ⏳" }]);

                await enviarAN8N(newData);
                return; // Salimos para no agregar respuesta genérica abajo
            default:
                botResponse = "Gracias. Si necesitas otra cotización, recarga la página.";
        }

        setFormData(newData);
        setStep(nextStep);

        // Agregar respuesta del bot con un pequeño delay para naturalidad
        setTimeout(() => {
            setMessages(prev => [...prev, { type: "bot", text: botResponse }]);
        }, 600);
    };

    const enviarAN8N = async (data) => {
        try {

            const webhookUrl = "https://n8n.stratik.cloud/webhook/karina";

            const payload = {
                ...data,
                origen: "chat"
            };

            const response = await fetch(webhookUrl, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.text();

            setLoading(false);
            setMessages(prev => [
                ...prev,
                { type: "bot", text: "¡Listo! He enviado todos los detalles a tu correo electrónico. 📩 ¡Revísalo!" }
            ]);

        } catch (error) {
            console.error(error);
            setLoading(false);
            setMessages(prev => [
                ...prev,
                { type: "bot", text: "Ups, tuve un problema conectando con el servidor. Por favor intenta más tarde." }
            ]);
        }
    };

    return (
        <div className="flex flex-col h-[500px] w-full">
            {/* Header del Chat */}
            <div className="bg-blue-600 text-white p-4 rounded-t-2xl flex justify-between items-center">
                <h3 className="font-bold">Chat Asistente de Viajes</h3>
                <button onClick={onClose} className="text-white hover:text-gray-200">✕</button>
            </div>

            {/* Área de Mensajes */}
            <div className="flex-1 overflow-y-auto p-4 bg-gray-50 space-y-4">
                {messages.map((msg, index) => (
                    <div key={index} className={`flex ${msg.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                        <div className={`max-w-[80%] p-3 rounded-2xl ${msg.type === 'user'
                            ? 'bg-blue-600 text-white rounded-br-none'
                            : 'bg-white border border-gray-200 text-gray-800 rounded-bl-none shadow-sm'
                            }`}>
                            {msg.text}
                        </div>
                    </div>
                ))}
                {loading && (
                    <div className="flex justify-start">
                        <div className="bg-white border p-3 rounded-2xl text-gray-500 italic text-sm">
                            Escribiendo itinerario...
                        </div>
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-white border-t rounded-b-2xl">
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSend()}
                        placeholder="Escribe aquí..."
                        className="flex-1 border rounded-full px-4 py-2 focus:outline-none focus:border-blue-600"
                        disabled={loading || step > 5}
                    />
                    <button
                        onClick={handleSend}
                        disabled={loading || step > 5}
                        className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 disabled:opacity-50"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M6 12L3.269 3.126A59.768 59.768 0 0121.485 12 59.77 59.77 0 013.27 20.876L5.999 12zm0 0h7.5" />
                        </svg>
                    </button>
                </div>
            </div>
        </div>
    );
}