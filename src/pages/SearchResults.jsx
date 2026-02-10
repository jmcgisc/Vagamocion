import React, { useEffect, useState } from 'react';
import { useLocation, Link } from 'react-router-dom';

export default function SearchResults() {
    const location = useLocation();
    const [results, setResults] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const WHATSAPP_NUMBER = "5215543708129";

    const searchParams = new URLSearchParams(location.search);
    const destino = searchParams.get("destino");
    const origen = searchParams.get("origen");
    const checkin = searchParams.get("checkin");
    const checkout = searchParams.get("checkout");
    const pasajeros = searchParams.get("pasajeros");
    const tipo = searchParams.get("tipo") || 'vuelos';

    useEffect(() => {
        const fetchResults = async () => {
            setLoading(true);
            setError(null);
            setResults([]);


            try {
                const WEBHOOK_URL = "https://n8n.stratik.cloud/webhook/buscar-vuelo-vagam";

                const response = await fetch(WEBHOOK_URL, {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        tipo: tipo,
                        origen_nombre: origen,
                        destino_nombre: destino,
                        checkin: checkin,
                        checkout: checkout,
                        pasajeros: parseInt(pasajeros) || 1
                    })
                });

                if (!response.ok) throw new Error("Error de conexión con n8n");

                const data = await response.json();
                const listaResultados = data.results || (Array.isArray(data) ? data : []);
                setResults(listaResultados);

            } catch (err) {
                console.error(err);
                setError(`No pudimos cargar los resultados.`);
            } finally {
                setLoading(false);
            }
        };

        if (destino) {
            fetchResults();
        } else {
            setLoading(false);
        }

    }, [tipo, destino, origen, checkin, checkout, pasajeros]);

    // DETERMINAR MODO
    const esModoHotel = tipo === 'hoteles';

    // --- FUNCIÓN GENERADORA DE WHATSAPP ---
    const enviarCotizacion = (item) => {
        const salto = "%0A"; // Salto de línea para URL
        let mensaje = "";

        if (esModoHotel) {
            mensaje = `Hola Vagamocion! 🏨 Me interesa cotizar este Hotel:${salto}${salto}` +
                `*Hotel:* ${item.nombre}${salto}` +
                `*Destino:* ${destino}${salto}` +
                `*Fechas:* ${checkin} al ${checkout}${salto}` +
                `*Precio Ref:* ${item.precio}${salto}` +
                `*Viajeros:* ${pasajeros}${salto}${salto}` +
                `¿Me ayudan con la disponibilidad?`;
        } else {
            mensaje = `Hola Vagamocion! ✈️ Me interesa cotizar este Vuelo:${salto}${salto}` +
                `*Ruta:* ${origen || 'MEX'} ➡️ ${destino}${salto}` +
                `*Aerolínea:* ${item.aerolinea}${salto}` +
                `*Horario:* ${item.salida} - ${item.llegada}${salto}` +
                `*Fechas:* ${checkin} - ${checkout || 'Solo Ida'}${salto}` +
                `*Precio Ref:* ${item.precio}${salto}` +
                `*Viajeros:* ${pasajeros}${salto}${salto}` +
                `¿Me ayudan a reservarlo?`;
        }

        window.open(`https://wa.me/${WHATSAPP_NUMBER}?text=${mensaje}`, '_blank');
    };

    return (
        <div className="min-h-screen bg-gray-50 pt-32 pb-20 px-4 font-sans text-gray-800">
            <div className="max-w-7xl mx-auto">

                {/* --- HEADER --- */}
                <div className="mb-10 flex flex-col md:flex-row justify-between items-end border-b border-gray-200 pb-6 gap-4">
                    <div>
                        <Link to="/" className="text-gray-400 hover:text-blue-900 mb-3 inline-flex items-center gap-2 text-sm font-bold tracking-wide transition-colors">
                            <span>←</span> VOLVER
                        </Link>
                        <h1 className="text-3xl md:text-5xl font-display font-black text-gray-900 capitalize leading-tight">
                            {esModoHotel ? 'Estadías en ' : 'Vuelos a '}
                            <span className="text-blue-900">{destino || "tu destino"}</span>
                        </h1>
                        <p className="text-gray-500 mt-2 text-lg font-light">
                            {checkin} • {pasajeros} Viajeros
                        </p>
                    </div>

                    <button onClick={() => window.location.href = '/'} className="bg-white border border-gray-200 text-gray-900 px-6 py-3 rounded-full text-sm font-bold hover:bg-gray-50 hover:border-gray-300 transition-all shadow-sm">
                        Modificar búsqueda
                    </button>
                </div>

                {/* --- LOADING --- */}
                {loading && (
                    <div className="flex flex-col items-center justify-center py-32 bg-white rounded-[3rem] shadow-sm border border-gray-100">
                        <div className="animate-spin rounded-full h-16 w-16 border-4 border-gray-100 border-t-blue-900 mb-6"></div>
                        <p className="text-gray-400 font-bold uppercase tracking-widest text-xs animate-pulse">
                            Buscando las mejores opciones...
                        </p>
                    </div>
                )}

                {/* --- ERROR --- */}
                {error && (
                    <div className="text-center py-20 bg-white rounded-[2rem] shadow-sm border border-red-50">
                        <p className="text-red-500 font-bold text-xl mb-4">⚠️ {error}</p>
                        <button onClick={() => window.location.reload()} className="bg-gray-900 text-white px-8 py-3 rounded-xl font-bold hover:bg-black transition-transform active:scale-95">
                            Reintentar
                        </button>
                    </div>
                )}

                {/* --- GRID DE RESULTADOS --- */}
                {!loading && !error && (
                    <div className={`grid gap-6 ${esModoHotel ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' : 'grid-cols-1'}`}>

                        {results.length === 0 ? (
                            <div className="col-span-full py-20 text-center">
                                <h3 className="text-2xl font-display font-bold text-gray-300">Sin resultados disponibles</h3>
                                <p className="text-gray-400 mt-2">Intenta cambiar las fechas o el destino.</p>
                            </div>
                        ) : (
                            results.map((item, index) => (

                                esModoHotel ? (
                                    /* ==========================
                                       TARJETA DE HOTEL (WHATSAPP)
                                       ========================== */
                                    <div key={index} className="group bg-white rounded-[2rem] overflow-hidden border border-gray-100 shadow-sm hover:shadow-2xl transition-all duration-500 flex flex-col h-full cursor-pointer">
                                        <div className="h-72 overflow-hidden relative">
                                            <img
                                                src={item.imagen}
                                                alt={item.nombre}
                                                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
                                                onError={(e) => { e.target.src = "https://images.unsplash.com/photo-1566073771259-6a8506099945" }}
                                            />
                                            <div className="absolute top-4 left-4 bg-white/95 backdrop-blur-sm px-3 py-1 rounded-full text-xs font-bold shadow-lg flex items-center gap-1">
                                                <span>★</span> {item.estrellas || "4.5"}
                                            </div>
                                        </div>
                                        <div className="p-6 flex-1 flex flex-col justify-between">
                                            <div>
                                                <h3 className="text-xl font-display font-bold text-gray-900 leading-tight mb-2">{item.nombre}</h3>
                                                <p className="text-gray-500 text-sm mb-4">📍 {item.ubicacion || "Centro"}</p>
                                                <div className="flex flex-wrap gap-2 mb-6">
                                                    {(item.amenities || ['Wifi', 'Pool']).slice(0, 3).map((tag, i) => (
                                                        <span key={i} className="text-[10px] uppercase tracking-wider bg-gray-50 text-gray-500 px-3 py-1 rounded-md font-bold border border-gray-100">
                                                            {tag}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                            <div className="flex items-center justify-between border-t border-gray-100 pt-5 mt-2">
                                                <div>
                                                    <p className="text-xs text-gray-400 font-bold uppercase tracking-wider mb-1">Desde</p>
                                                    <p className="text-2xl font-display font-black text-gray-900">{item.precio}</p>
                                                </div>
                                                {/* BOTÓN WHATSAPP HOTEL */}
                                                <button
                                                    onClick={() => enviarCotizacion(item)}
                                                    className="bg-[#25D366] text-white px-6 py-3 rounded-xl font-bold text-sm hover:bg-[#128C7E] transition-colors flex items-center gap-2 shadow-lg shadow-green-200"
                                                >
                                                    <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                                    Cotizar
                                                </button>
                                            </div>
                                        </div>
                                    </div>

                                ) : (

                                    /* ==========================
                                       TARJETA DE VUELO (WHATSAPP)
                                       ========================== */
                                    <div key={index} className="bg-white rounded-[2rem] p-6 md:p-8 shadow-sm border border-gray-100 hover:shadow-xl hover:border-blue-100 transition-all duration-300 flex flex-col lg:flex-row items-center gap-6 lg:gap-12 group">

                                        {/* 1. Aerolínea */}
                                        <div className="w-full lg:w-1/4 flex items-center gap-4">
                                            <div className="w-16 h-16 bg-white rounded-2xl shadow-sm border border-gray-100 p-3 flex items-center justify-center shrink-0">
                                                <img
                                                    src={item.logo}
                                                    alt={item.aerolinea}
                                                    className="w-full h-full object-contain"
                                                    onError={(e) => { e.target.src = "https://cdn-icons-png.flaticon.com/512/723/723955.png" }}
                                                />
                                            </div>
                                            <div>
                                                <h3 className="font-bold text-gray-900 text-lg leading-tight">{item.aerolinea}</h3>
                                                <span className={`inline-block mt-1 text-[10px] font-bold uppercase tracking-wider px-2 py-1 rounded-md ${item.escalas === 'Directo' ? 'bg-green-50 text-green-700' : 'bg-orange-50 text-orange-700'}`}>
                                                    {item.escalas || "Vuelo"}
                                                </span>
                                            </div>
                                        </div>

                                        {/* 2. Itinerario */}
                                        <div className="flex-1 w-full flex items-center justify-center gap-4 md:gap-10 text-center border-t border-b lg:border-0 border-gray-100 py-6 lg:py-0">
                                            <div className="text-left md:text-center min-w-[80px]">
                                                <p className="font-display font-black text-2xl text-gray-900">{item.salida}</p>
                                                <p className="text-xs text-gray-400 font-bold tracking-widest mt-1">SALIDA</p>
                                            </div>
                                            <div className="flex flex-col items-center w-full max-w-[150px]">
                                                <p className="text-xs text-gray-400 font-medium mb-2">{item.duracion}</p>
                                                <div className="w-full h-[2px] bg-gray-200 relative">
                                                    <div className="absolute inset-y-0 left-0 bg-blue-900 w-1/2 rounded-full opacity-20"></div>
                                                    <span className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 text-blue-900 bg-white p-1 rounded-full text-sm transform rotate-90">✈</span>
                                                </div>
                                            </div>
                                            <div className="text-right md:text-center min-w-[80px]">
                                                <p className="font-display font-black text-2xl text-gray-900">{item.llegada}</p>
                                                <p className="text-xs text-gray-400 font-bold tracking-widest mt-1">LLEGADA</p>
                                            </div>
                                        </div>

                                        {/* 3. Precio y BOTÓN WHATSAPP */}
                                        <div className="w-full lg:w-auto text-right flex lg:flex-col justify-between items-center lg:items-end gap-2 min-w-[140px]">
                                            <div className="text-left lg:text-right">
                                                <p className="text-3xl font-display font-black text-blue-900 tracking-tighter">${item.precio}</p>
                                                <p className="text-xs text-gray-400 font-bold">USD / Persona</p>
                                            </div>
                                            <button
                                                onClick={() => enviarCotizacion(item)}
                                                className="bg-[#25D366] text-white px-8 py-3 rounded-xl font-bold shadow-lg shadow-green-200 hover:bg-[#128C7E] hover:scale-105 transition-all text-center flex items-center gap-2"
                                            >
                                                <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413Z" /></svg>
                                                Solicitar
                                            </button>
                                        </div>

                                    </div>
                                )
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}