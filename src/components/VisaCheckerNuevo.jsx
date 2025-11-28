// src/components/VisaChecker.jsx
import { useState } from 'react'
import { Loader2, ChevronDown } from 'lucide-react'

const paises = [
  { codigo: 'US', nombre: 'Estados Unidos', bandera: 'https://flagcdn.com/us.svg' },
  { codigo: 'CA', nombre: 'Canadá', bandera: 'https://flagcdn.com/ca.svg' },
  { codigo: 'ES', nombre: 'España', bandera: 'https://flagcdn.com/es.svg' },
  { codigo: 'FR', nombre: 'Francia', bandera: 'https://flagcdn.com/fr.svg' },
  { codigo: 'IT', nombre: 'Italia', bandera: 'https://flagcdn.com/it.svg' },
  { codigo: 'DE', nombre: 'Alemania', bandera: 'https://flagcdn.com/de.svg' },
  { codigo: 'GB', nombre: 'Reino Unido', bandera: 'https://flagcdn.com/gb.svg' },
  { codigo: 'JP', nombre: 'Japón', bandera: 'https://flagcdn.com/jp.svg' },
  { codigo: 'KR', nombre: 'Corea del Sur', bandera: 'https://flagcdn.com/kr.svg' },
  { codigo: 'CN', nombre: 'China', bandera: 'https://flagcdn.com/cn.svg' },
  { codigo: 'TH', nombre: 'Tailandia', bandera: 'https://flagcdn.com/th.svg' },
  { codigo: 'AU', nombre: 'Australia', bandera: 'https://flagcdn.com/au.svg' },
  { codigo: 'BR', nombre: 'Brasil', bandera: 'https://flagcdn.com/br.svg' },
  { codigo: 'AR', nombre: 'Argentina', bandera: 'https://flagcdn.com/ar.svg' },
  { codigo: 'CO', nombre: 'Colombia', bandera: 'https://flagcdn.com/co.svg' },
  { codigo: 'PE', nombre: 'Perú', bandera: 'https://flagcdn.com/pe.svg' },
  { codigo: 'CL', nombre: 'Chile', bandera: 'https://flagcdn.com/cl.svg' },
  { codigo: 'EC', nombre: 'Ecuador', bandera: 'https://flagcdn.com/ec.svg' },
  { codigo: 'VE', nombre: 'Venezuela', bandera: 'https://flagcdn.com/ve.svg' },
  { codigo: 'CR', nombre: 'Costa Rica', bandera: 'https://flagcdn.com/cr.svg' },
  { codigo: 'PA', nombre: 'Panamá', bandera: 'https://flagcdn.com/pa.svg' },
  { codigo: 'GT', nombre: 'Guatemala', bandera: 'https://flagcdn.com/gt.svg' },
  { codigo: 'SV', nombre: 'El Salvador', bandera: 'https://flagcdn.com/sv.svg' },
  { codigo: 'NI', nombre: 'Nicaragua', bandera: 'https://flagcdn.com/ni.svg' },
  { codigo: 'HN', nombre: 'Honduras', bandera: 'https://flagcdn.com/hn.svg' },
  { codigo: 'DO', nombre: 'República Dominicana', bandera: 'https://flagcdn.com/do.svg' },
  { codigo: 'CU', nombre: 'Cuba', bandera: 'https://flagcdn.com/cu.svg' },
  { codigo: 'TR', nombre: 'Turquía', bandera: 'https://flagcdn.com/tr.svg' },
  { codigo: 'AE', nombre: 'Emiratos Árabes', bandera: 'https://flagcdn.com/ae.svg' },
  { codigo: 'EG', nombre: 'Egipto', bandera: 'https://flagcdn.com/eg.svg' },
  { codigo: 'IN', nombre: 'India', bandera: 'https://flagcdn.com/in.svg' },
  { codigo: 'ID', nombre: 'Indonesia', bandera: 'https://flagcdn.com/id.svg' },
  { codigo: 'MY', nombre: 'Malasia', bandera: 'https://flagcdn.com/my.svg' },
  { codigo: 'SG', nombre: 'Singapur', bandera: 'https://flagcdn.com/sg.svg' },
  { codigo: 'VN', nombre: 'Vietnam', bandera: 'https://flagcdn.com/vn.svg' },
  { codigo: 'PH', nombre: 'Filipinas', bandera: 'https://flagcdn.com/ph.svg' },
  { codigo: 'NZ', nombre: 'Nueva Zelanda', bandera: 'https://flagcdn.com/nz.svg' },
  { codigo: 'ZA', nombre: 'Sudáfrica', bandera: 'https://flagcdn.com/za.svg' },
  { codigo: 'MA', nombre: 'Marruecos', bandera: 'https://flagcdn.com/ma.svg' },
  { codigo: 'TN', nombre: 'Túnez', bandera: 'https://flagcdn.com/tn.svg' },
  { codigo: 'JO', nombre: 'Jordania', bandera: 'https://flagcdn.com/jo.svg' },
  { codigo: 'IL', nombre: 'Israel', bandera: 'https://flagcdn.com/il.svg' },
  { codigo: 'GR', nombre: 'Grecia', bandera: 'https://flagcdn.com/gr.svg' },
  { codigo: 'PT', nombre: 'Portugal', bandera: 'https://flagcdn.com/pt.svg' },
  { codigo: 'NL', nombre: 'Países Bajos', bandera: 'https://flagcdn.com/nl.svg' },
  { codigo: 'BE', nombre: 'Bélgica', bandera: 'https://flagcdn.com/be.svg' },
  { codigo: 'AT', nombre: 'Austria', bandera: 'https://flagcdn.com/at.svg' },
  { codigo: 'CH', nombre: 'Suiza', bandera: 'https://flagcdn.com/ch.svg' },
  { codigo: 'NO', nombre: 'Noruega', bandera: 'https://flagcdn.com/no.svg' },
  { codigo: 'SE', nombre: 'Suecia', bandera: 'https://flagcdn.com/se.svg' },
  { codigo: 'DK', nombre: 'Dinamarca', bandera: 'https://flagcdn.com/dk.svg' },
  { codigo: 'FI', nombre: 'Finlandia', bandera: 'https://flagcdn.com/fi.svg' }
];

export default function VisaChecker() {
  const [paisSeleccionado, setPaisSeleccionado] = useState(null)
  const [resultado, setResultado] = useState(null)
  const [cargando, setCargando] = useState(false)
  const [abierto, setAbierto] = useState(false)

  const consultar = async (pais) => {
    setPaisSeleccionado(pais)
    setAbierto(false)
    setCargando(true)
    setResultado(null)

    try {
      const res = await fetch('https://n8n.stratik.cloud/webhook/visa-checker', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nationality: 'MX', destination: pais.codigo })
      })
      const data = await res.json()
      setResultado(data)
    } catch {
      setResultado({ error: 'Error de conexión' })
    } finally {
      setCargando(false)
    }
  }

  return (
    <div className="bg-white rounded-3xl shadow-2xl p-10 max-w-5xl mx-auto my-20">
      <h2 className="text-4xl font-bold text-center mb-8 text-gray-800">
        ¿Necesitas visa para tu próximo viaje?
      </h2>

      {/* SELECT CON BANDERAS */}
      <div className="relative max-w-xl mx-auto">
        <button
          onClick={() => setAbierto(!abierto)}
          className="w-full px-8 py-6 bg-gradient-to-r from-emerald-500 to-teal-600 text-white font-bold text-xl rounded-2xl flex items-center justify-between hover:from-emerald-600 hover:to-teal-700 transition shadow-lg"
        >
          <span className="flex items-center gap-4">
            {paisSeleccionado ? (
              <>
                <img src={paisSeleccionado.bandera} alt="" className="w-10 h-7 rounded" />
                {paisSeleccionado.nombre}
              </>
            ) : (
              "Selecciona tu destino"
            )}
          </span>
          <ChevronDown className={`w-6 h-6 transition ${abierto ? 'rotate-180' : ''}`} />
        </button>

        {abierto && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border-2 border-gray-200 max-h-96 overflow-y-auto z-50">
            {paises.map((pais) => (
              <button
                key={pais.codigo}
                onClick={() => consultar(pais)}
                className="w-full px-6 py-4 flex items-center gap-4 hover:bg-emerald-50 transition text-left"
              >
                <img src={pais.bandera} alt={pais.nombre} className="w-12 h-8 rounded shadow" />
                <span className="font-medium text-gray-800">{pais.nombre}</span>
                <span className="ml-auto text-gray-500 text-sm">{pais.codigo}</span>
              </button>
            ))}
          </div>
        )}
      </div>

      {/* RESULTADO CON BANDERA GRANDE */}
      {cargando && (
        <div className="text-center py-20">
          <Loader2 className="w-16 h-16 animate-spin mx-auto text-emerald-600" />
        </div>
      )}

      {resultado && !resultado.error && (
        <div className="mt-12 bg-gradient-to-br from-emerald-50 to-teal-50 rounded-3xl p-6 sm:p-12 text-center border-4 border-emerald-300"> {/* Ajuste en padding */}
          <img 
            src={paisSeleccionado.bandera} 
            alt={resultado.destino}
            className="w-40 h-28 sm:w-56 sm:h-40 mx-auto rounded-2xl shadow-2xl border-8 border-white mb-8" // Ajuste en tamaño de bandera para móvil
          />

          <h3 className="text-3xl sm:text-5xl font-bold mb-6"> {/* <--- CLAVE: Reducción de texto en móvil */}
            {resultado.necesita_visa === "NO" ? "¡NO necesitas visa!" : "SÍ necesitas visa"}
          </h3>

          <p className="text-xl sm:text-4xl mb-10 font-bold"> {/* <--- CLAVE: Reducción de texto en móvil */}
            México → <span className="text-emerald-600">{resultado.destino}</span>
          </p>

          <div className="grid md:grid-cols-2 gap-4 sm:gap-8 max-w-3xl mx-auto text-left text-lg">
            <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg"> {/* Ajuste en padding */}
              <strong>Tipo:</strong><br/>
              <span className="text-xl sm:text-2xl font-bold text-emerald-600">{resultado.tipo}</span> {/* <--- CLAVE */}
            </div>
            {resultado.dias && (
              <div className="bg-white p-4 sm:p-6 rounded-2xl shadow-lg"> {/* Ajuste en padding */}
                <strong>Estancia:</strong><br/>
                <span className="text-2xl sm:text-3xl font-bold text-emerald-600">{resultado.dias} días</span> {/* <--- CLAVE */}
              </div>
            )}
            {resultado.nota && (
              <div className="md:col-span-2 bg-amber-50 p-4 sm:p-6 rounded-2xl border-2 border-amber-400"> {/* Ajuste en padding */}
                <strong className="text-amber-900">Nota:</strong><br/>
                <span className="text-amber-900 text-base sm:text-lg">{resultado.nota}</span> {/* <--- CLAVE */}
              </div>
            )}
          </div>

          <p className="text-sm text-gray-500 mt-10">
            Actualizado: {resultado.fecha}
          </p>
        </div>
      )}
    </div>
  )
}