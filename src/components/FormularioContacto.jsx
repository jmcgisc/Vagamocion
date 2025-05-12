import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import emailjs from "@emailjs/browser";
import { Helmet } from "react-helmet";

export default function FormularioContacto() {
  const [form, setForm] = useState({
    pais: "",
    ciudad: "",
    fechaInicio: "",
    fechaFin: "",
    personas: "",
    menores: "",
    servicios: "",
    telefono: "",
    email: "",
    presupuesto: "",
  });

  const [captchaToken, setCaptchaToken] = useState(null);
  const [errores, setErrores] = useState({ fecha: "", captcha: "" });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);

  const SERVICE_ID = "service_2ast7go";
  const TEMPLATE_ID = "template_5yvm7ra";
  const PUBLIC_KEY = "KPyTxiP4_W_2HKC6K";

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (new Date(form.fechaFin) < new Date(form.fechaInicio)) {
      setErrores({ ...errores, fecha: "La fecha de fin no puede ser anterior a la de inicio." });
      return;
    }

    if (!captchaToken) {
      setErrores({ ...errores, captcha: "Completa el captcha antes de enviar." });
      return;
    }

    setErrores({ fecha: "", captcha: "" });
    setEnviando(true);
  
    try {
      const result = await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        {
          ...form,
          "g-recaptcha-response": captchaToken,
        },
        PUBLIC_KEY
      );

      console.log("Email enviado", result.text);
      setEnviado(true);
      setForm({
        pais: "",
        ciudad: "",
        fechaInicio: "",
        fechaFin: "",
        personas: "",
        menores: "",
        servicios: "",
        telefono: "",
        email: "",
        presupuesto: "",
      });
      setCaptchaToken(null);
    } catch (error) {
      console.error("Error al enviar el correo:", error);
      alert("Error al enviar el formulario");
    }

    setTimeout(() => {
      setEnviando(false);
      setEnviado(false);
    }, 5000);
  };

  // ... (El resto del componente permanece igual: <Helmet> y el <form>)


  return (
    <>
      <Helmet>
        <meta property="og:title" content="Contáctanos | Agencia de Viajes" />
        <meta property="og:description" content="Planea tu viaje ideal con nosotros. Llena el formulario y te contactamos." />
        <meta property="og:image" content="https://vagamociontravel.com/imagen-seo.jpg" />
        <meta property="og:url" content="https://vagamociontravel.com/contacto" />
        <meta property="og:type" content="website" />
        <script type="application/ld+json">
          {`
          {
            "@context": "https://schema.org",
            "@type": "TravelAgency",
            "name": "Agencia de Viajes Vagamocion Travel",
            "url": "https://vagamociontravel.com",
            "logo": "https://vagamociontravel.com/logo.png",
            "image": "https://vagamociontravel.com/imagen.jpg",
            "description": "Especialistas en viajes personalizados. Vuelos, hoteles, tours y más.",
            "address": {
              "@type": "PostalAddress",
              "streetAddress": "Gemelos 42 depto 1 col prado churubusco",
              "addressLocality": "Ciudad de México",
              "addressRegion": "CDMX",
              "postalCode": "04230",
              "addressCountry": "MX"
            },
            "telephone": "+52-55-1234-5678",
            "openingHours": "Mo-Fr 09:00-18:00",
            "contactPoint": {
              "@type": "ContactPoint",
              "telephone": "+52-55-1234-5678",
              "contactType": "Customer Service",
              "areaServed": "MX",
              "availableLanguage": ["Spanish", "English"]
            }
          }
          `}
        </script>
      </Helmet>

      <section className="py-16 bg-white dark:bg-gray-900">
        <div className="max-w-2xl mx-auto px-6">
          <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
            Contáctanos
          </h2>

          {enviado ? (
            <div className="text-center animate-fade-in-up">
              <div className="text-5xl mb-4">🎉</div>
              <p className="text-green-600 dark:text-green-400 text-xl font-semibold">
                ¡Mensaje enviado!
              </p>
              <p className="text-gray-600 dark:text-gray-300 mt-2">
                Te contactaremos muy pronto.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-4">
              <input type="text" name="pais" placeholder="País" value={form.pais} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white" />
              <input type="text" name="ciudad" placeholder="Ciudad" value={form.ciudad} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white" />

              <div className="flex gap-4">
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha Inicio</label>
                  <input type="date" name="fechaInicio" value={form.fechaInicio} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white" />
                </div>
                <div className="w-1/2">
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Fecha Fin</label>
                  <input type="date" name="fechaFin" value={form.fechaFin} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white" />
                </div>
              </div>
              {errores.fecha && <p className="text-red-600 text-sm">{errores.fecha}</p>}

              <input type="number" name="personas" placeholder="Cantidad de personas" value={form.personas} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white" />
              <select name="menores" value={form.menores} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white">
                <option value="">¿Viajan menores de edad?</option>
                <option value="Si">Sí</option>
                <option value="No">No</option>
              </select>
              <input type="tel" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white" />
              <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white" />
              <select name="presupuesto" value={form.presupuesto} onChange={handleChange} required className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white">
                <option value="">Selecciona tu presupuesto estimado</option>
                <option value="<$5,000.00 mxn">&lt;$5,000.00 mxn</option>
                <option value="$5,000.00 - $10,000.00 mxn">de $5,000.00 mxn a $10,000.00 mxn</option>
                <option value="$10,000.00 - $20,000.00 mxn">de $10,000.00 mxn a $20,000.00 mxn</option>
                <option value="$20,000.00 - $50,000.00 mxn">de $20,000.00 mxn a $50,000.00 mxn</option>
                <option value="$50,000.00 - $80,000.00 mxn">de $50,000.00 mxn a $80,000.00 mxn</option>
                <option value="$80,000.00 - $100,000.00 mxn">de $80,000.00 mxn a $100,000.00 mxn</option>
                <option value=">$100,000.00 mxn">&gt;$100,000.00 mxn</option>
              </select>
              <textarea name="servicios" placeholder="¿Qué necesitas? (Vuelos, hoteles, tours...)" value={form.servicios} onChange={handleChange} required rows={3} className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white" />

              <div className="pt-2"> 
                <ReCAPTCHA sitekey="6LdIRDYrAAAAAI2v8tSKwh6Hpm1GaBAxglDY-XiC" onChange={(token) => setCaptchaToken(token)} />
                {errores.captcha && <p className="text-red-600 text-sm mt-2">{errores.captcha}</p>}
              </div>

              <button type="submit" disabled={enviando} className={`w-full font-bold py-2 px-6 rounded-lg transition flex items-center justify-center gap-2 ${enviando ? "bg-blue-300 cursor-not-allowed" : "bg-blue-600 hover:bg-blue-700 text-white"}`}>
                {enviando ? (
                  <>
                    <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
                    </svg>
                    Enviando...
                  </>
                ) : (
                  "Enviar"
                )}
              </button>
            </form>
          )}
        </div>
      </section>
    </>
  );
}
