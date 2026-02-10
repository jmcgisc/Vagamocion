import { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';

// --- 1. BASE DE DATOS DE AEROPUERTOS ---
const AEROPUERTOS = [
    { code: 'MEX', ciudad: 'Ciudad de México', nombre: 'Benito Juárez' },
    { code: 'CUN', ciudad: 'Cancún', nombre: 'Internacional de Cancún' },
    { code: 'MTY', ciudad: 'Monterrey', nombre: 'Mariano Escobedo' },
    { code: 'GDL', ciudad: 'Guadalajara', nombre: 'Miguel Hidalgo' },
    { code: 'TIJ', ciudad: 'Tijuana', nombre: 'Abelardo L. Rodríguez' },
    { code: 'MIA', ciudad: 'Miami', nombre: 'Miami International' },
    { code: 'JFK', ciudad: 'Nueva York', nombre: 'John F. Kennedy' },
    { code: 'LAX', ciudad: 'Los Ángeles', nombre: 'Los Angeles Intl' },
    { code: 'MAD', ciudad: 'Madrid', nombre: 'Barajas' },
    { code: 'CDG', ciudad: 'París', nombre: 'Charles de Gaulle' },
    { code: 'LHR', ciudad: 'Londres', nombre: 'Heathrow' },
    { code: 'BOG', ciudad: 'Bogotá', nombre: 'El Dorado' },
    { code: 'EZE', ciudad: 'Buenos Aires', nombre: 'Ezeiza' },
    { code: 'YYZ', ciudad: 'Toronto', nombre: 'Pearson' },
    { code: 'YVR', ciudad: 'Vancouver', nombre: 'Vancouver Intl' },
    { code: 'DXB', ciudad: 'Dubái', nombre: 'Dubai International' },
];

// --- 2. COMPONENTE AUTOCOMPLETAR ---
const AirportInput = ({ label, name, placeholder, icon, required }) => {
    const [query, setQuery] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [selected, setSelected] = useState(null);
    const wrapperRef = useRef(null);

    // Filtrar: Si está vacío muestra todos, si no filtra
    const filtered = query === ''
        ? AEROPUERTOS
        : AEROPUERTOS.filter((item) =>
            item.ciudad.toLowerCase().includes(query.toLowerCase()) ||
            item.code.toLowerCase().includes(query.toLowerCase())
        );

    // Cerrar al hacer clic fuera
    useEffect(() => {
        function handleClickOutside(event) {
            if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
                setIsOpen(false);
            }
        }
        document.addEventListener("mousedown", handleClickOutside);
        return () => document.removeEventListener("mousedown", handleClickOutside);
    }, [wrapperRef]);

    return (
        <div className="relative w-full" ref={wrapperRef}>
            {/* Input Visual */}
            <div className="flex items-center relative">
                <div className="absolute left-2 text-gray-400 group-focus-within:text-blue-600 pointer-events-none">
                    {icon}
                </div>
                <div className="pl-10 w-full">
                    <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">{label}</label>
                    <input
                        type="text"
                        className="w-full bg-transparent font-bold text-gray-900 placeholder-gray-300 focus:outline-none text-lg truncate py-1"
                        placeholder={placeholder}
                        value={query}
                        onChange={(e) => {
                            setQuery(e.target.value);
                            setIsOpen(true);
                            setSelected(null);
                        }}
                        // IMPORTANTE: Al hacer clic (focus), abrimos la lista inmediatamente
                        onClick={() => setIsOpen(true)}
                        onFocus={() => setIsOpen(true)}
                        required={required}
                        autoComplete="off"
                    />
                </div>
            </div>

            {/* Input Oculto (Envía el código o lo que escriba el usuario) */}
            <input type="hidden" name={name} value={selected ? selected.code : (query.length === 3 ? query.toUpperCase() : '')} />

            {/* LISTA DESPLEGABLE */}
            {isOpen && filtered.length > 0 && (
                <div className="absolute top-[110%] left-0 w-[280px] bg-white mt-1 rounded-2xl shadow-2xl border border-gray-100 max-h-60 overflow-y-auto overflow-x-hidden z-[9999]">
                    {filtered.map((item) => (
                        <div
                            key={item.code}
                            className="px-5 py-3 hover:bg-blue-50 cursor-pointer border-b border-gray-50 last:border-0 transition-colors flex justify-between items-center group"
                            onClick={() => {
                                setSelected(item);
                                setQuery(`${item.ciudad} (${item.code})`);
                                setIsOpen(false);
                            }}
                        >
                            <div className="flex flex-col text-left">
                                <span className="font-bold text-gray-800 text-sm group-hover:text-blue-700">{item.ciudad}</span>
                                <span className="text-xs text-gray-400">{item.nombre}</span>
                            </div>
                            <span className="text-xs bg-gray-100 text-gray-600 px-2 py-1 rounded font-mono font-bold group-hover:bg-blue-100 group-hover:text-blue-600">
                                {item.code}
                            </span>
                        </div>
                    ))}
                </div>
            )}
        </div>
    );
};

// --- 3. BUSCADOR PRINCIPAL ---
export default function BuscadorViajes() {

    const [activeTab, setActiveTab] = useState('viajes');
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchParams = new URLSearchParams();

        const origenRaw = formData.get('origen');
        const destinoRaw = formData.get('destino');

        // Construimos la URL
        searchParams.append('tipo', activeTab);

        // LÓGICA DE BACKUP:
        // Si el usuario deja vacío el origen en "Vuelos", enviamos 'MEX' por defecto SOLO internamente en la URL
        // (Visualmente sigue vacío, pero la búsqueda no falla)
        const origenFinal = activeTab === 'hoteles' ? '' : (origenRaw || 'MEX');

        searchParams.append('origen', origenFinal);
        searchParams.append('destino', destinoRaw);
        searchParams.append('checkin', formData.get('checkin'));
        searchParams.append('checkout', formData.get('checkout'));
        searchParams.append('pasajeros', formData.get('pasajeros'));

        navigate(`/resultados?${searchParams.toString()}`);
    };

    return (
        <div className="w-full max-w-6xl mx-auto -mt-16 relative z-30 px-4 font-sans">
            <div className="bg-white rounded-[2rem] shadow-2xl p-2 md:p-6 animate-fade-in-up relative overflow-visible">

                {/* PESTAÑAS */}
                <div className="flex gap-2 mb-6 border-b border-gray-100 pb-2 px-2 overflow-x-auto">
                    {[
                        { id: 'viajes', label: 'Trip', icon: '🌍' },
                        { id: 'hoteles', label: 'Hotel', icon: '🏨' },
                        { id: 'vuelos', label: 'Flight', icon: '✈️' },
                    ].map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`flex items-center gap-2 px-6 py-2 rounded-full font-bold transition-all whitespace-nowrap text-sm md:text-base ${activeTab === tab.id
                                ? 'bg-[#0a2540] text-white shadow-lg'
                                : 'text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            <span>{tab.icon}</span>
                            {tab.label}
                        </button>
                    ))}
                </div>

                {/* FORMULARIO */}
                <form onSubmit={handleSubmit} className="flex flex-col lg:flex-row items-stretch lg:items-center gap-4 bg-gray-50 p-4 rounded-3xl border border-gray-100 relative z-10">

                    {/* --- 1. ORIGEN (Sin default visual) --- */}
                    {activeTab !== 'hoteles' && (
                        <>
                            <div className="flex-1 border-b lg:border-b-0 border-gray-200 pb-2 lg:pb-0 relative z-30">
                                <AirportInput
                                    label="Origen"
                                    name="origen"
                                    placeholder="¿Desde dónde?"
                                    // defaultValue="MEX" <--- ELIMINADO
                                    icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>}
                                />
                            </div>
                            <div className="hidden lg:block w-px h-12 bg-gray-300 mx-2"></div>
                        </>
                    )}

                    {/* --- 2. DESTINO --- */}
                    <div className="flex-1 border-b lg:border-b-0 border-gray-200 pb-2 lg:pb-0 relative z-20">
                        <AirportInput
                            label="Destino"
                            name="destino"
                            placeholder={activeTab === 'hoteles' ? "Ciudad o Hotel" : "¿A dónde vas?"}
                            required={true}
                            icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2 2 2 0 012 2v2.945M8 3.935V5.5A2.5 2.5 0 0010.5 8h.5a2 2 0 012 2 2 2 0 104 0 2 2 0 012-2h1.064M15 20.488V18a2 2 0 012-2h3.064M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>}
                        />
                    </div>

                    <div className="hidden lg:block w-px h-12 bg-gray-300 mx-2"></div>

                    {/* --- 3. FECHAS --- */}
                    <div className="flex-[1.5] flex gap-4 border-b lg:border-b-0 border-gray-200 pb-2 lg:pb-0 relative z-10">
                        <div className="relative group flex-1 pl-2">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                                {activeTab === 'hoteles' ? 'Entrada' : 'Ida'}
                            </label>
                            <input name="checkin" type="date" className="w-full bg-transparent font-bold text-gray-900 focus:outline-none text-sm lg:text-base cursor-pointer" required />
                        </div>
                        <div className="relative group flex-1 pl-2 border-l border-gray-200 lg:border-none">
                            <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">
                                {activeTab === 'hoteles' ? 'Salida' : 'Vuelta'}
                            </label>
                            <input name="checkout" type="date" className="w-full bg-transparent font-bold text-gray-900 focus:outline-none text-sm lg:text-base cursor-pointer" />
                        </div>
                    </div>

                    <div className="hidden lg:block w-px h-12 bg-gray-300 mx-2"></div>

                    {/* --- 4. PASAJEROS --- */}
                    <div className="flex-1 pl-2 relative z-0">
                        <label className="block text-xs font-bold text-gray-500 uppercase tracking-wider mb-1">Viajeros</label>
                        <select name="pasajeros" className="w-full bg-transparent font-bold text-gray-900 focus:outline-none appearance-none cursor-pointer text-lg">
                            <option value="1">1 Persona</option>
                            <option value="2">2 Personas</option>
                            <option value="3">3 Personas</option>
                            <option value="4">Familia (4)</option>
                        </select>
                    </div>

                    {/* BOTÓN BUSCAR */}
                    <button
                        type="submit"
                        className="w-full lg:w-auto bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-2xl font-bold shadow-lg shadow-blue-600/30 transition-all hover:scale-105 flex items-center justify-center gap-2 mt-4 lg:mt-0 relative z-0"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
                        Buscar
                    </button>
                </form>
            </div>
        </div>
    );
}