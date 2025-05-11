import { useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";

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

  const [errores, setErrores] = useState({ fecha: "", captcha: "" });
  const [enviado, setEnviado] = useState(false);
  const [enviando, setEnviando] = useState(false);
  const [captchaValido, setCaptchaValido] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleCaptcha = (value) => {
    setCaptchaValido(!!value);
    if (value) {
      setErrores((prev) => ({ ...prev, captcha: "" }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (new Date(form.fechaFin) < new Date(form.fechaInicio)) {
      setErrores({ ...errores, fecha: "La fecha de fin no puede ser anterior a la de inicio." });
      return;
    }

    if (!captchaValido) {
      setErrores({ ...errores, captcha: "Por favor verifica que no eres un robot." });
      return;
    }

    setErrores({ fecha: "", captcha: "" });
    setEnviando(true);
    console.log(form);
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

    setTimeout(() => {
      setEnviado(false);
      setEnviando(false);
      setCaptchaValido(false);
    }, 5000);
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">
          Contáctanos
        </h2>

        {enviado ? (
          <div className="text-center animate-fade-in-up transition-all duration-500">
            <div className="text-5xl mb-4">🎉</div>
            <p className="text-green-600 dark:text-green-400 text-xl font-semibold">
              ¡Mensaje enviado!
            </p>
            <p className="text-gray-600 dark:text-gray-300 mt-2">
              Te contactaremos muy pronto. Gracias por escribirnos.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4">
            <input type="text" name="pais" placeholder="País" value={form.pais} onChange={handleChange} required
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white" />
            <input type="text" name="ciudad" placeholder="Ciudad" value={form.ciudad} onChange={handleChange} required
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white" />

            <div className="flex gap-4">
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fecha de inicio
                </label>
                <input type="date" name="fechaInicio" value={form.fechaInicio} onChange={handleChange} required
                  min={new Date().toISOString().split("T")[0]}
                  className={`w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white ${
                    errores.fecha ? "border-2 border-red-500" : ""
                  }`} />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Fecha de fin
                </label>
                <input type="date" name="fechaFin" value={form.fechaFin} onChange={handleChange} required
                  min={form.fechaInicio || new Date().toISOString().split("T")[0]}
                  className={`w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white ${
                    errores.fecha ? "border-2 border-red-500" : ""
                  }`} />
              </div>
            </div>
            {errores.fecha && (
              <p className="text-red-600 dark:text-red-400 text-sm font-semibold mt-1">{errores.fecha}</p>
            )}

            <input type="number" name="personas" placeholder="Cantidad de personas" value={form.personas} onChange={handleChange} required
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white" />
            <input type="text" name="menores" placeholder="¿Viajan menores de edad?" value={form.menores} onChange={handleChange} required
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white" />
            <textarea name="servicios" placeholder="¿Qué necesitas? (Vuelos, hoteles, tours...)" value={form.servicios} onChange={handleChange} required rows={3}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white" />
            <input type="tel" name="telefono" placeholder="Teléfono" value={form.telefono} onChange={handleChange} required
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white" />
            <input type="email" name="email" placeholder="Email" value={form.email} onChange={handleChange} required
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white" />
            <textarea name="presupuesto" placeholder="Presupuesto estimado" value={form.presupuesto} onChange={handleChange} required rows={2}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white" />

            {/* CAPTCHA */}
            <div className="flex justify-center">
              <ReCAPTCHA
                sitekey="TU_SITE_KEY_AQUÍ" // ← Reemplaza esto con tu propia clave
                onChange={handleCaptcha}
              />
            </div>
            {errores.captcha && (
              <p className="text-red-600 dark:text-red-400 text-sm font-semibold text-center">
                {errores.captcha}
              </p>
            )}

            <button type="submit" disabled={enviando}
              className={`w-full font-bold py-2 px-6 rounded-lg transition flex items-center justify-center gap-2 ${
                enviando
                  ? "bg-blue-300 cursor-not-allowed"
                  : "bg-blue-600 hover:bg-blue-700 text-white"
              }`}>
              {enviando ? (
                <>
                  <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                    <path className="opacity-75" fill="currentColor"
                      d="M4 12a8 8 0 018-8v4l3-3-3-3v4a8 8 0 100 16v-4l-3 3 3 3v-4a8 8 0 01-8-8z" />
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
  );
}
