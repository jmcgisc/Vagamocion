import { useState } from "react";

export default function FormularioContacto() {
  const [form, setForm] = useState({ nombre: "", email: "", mensaje: "" });
  const [enviado, setEnviado] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Aquí podrías conectarte con un backend, EmailJS o Formspree
    console.log(form);
    setEnviado(true);
  };

  return (
    <section className="py-16 bg-white dark:bg-gray-900">
      <div className="max-w-2xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Contáctanos</h2>
        {enviado ? (
          <p className="text-center text-green-600 dark:text-green-400">¡Mensaje enviado! Te contactaremos pronto.</p>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            <input
              type="text"
              name="nombre"
              placeholder="Tu nombre"
              value={form.nombre}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white"
            />
            <input
              type="email"
              name="email"
              placeholder="Tu correo"
              value={form.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white"
            />
            <textarea
              name="mensaje"
              placeholder="Tu mensaje"
              value={form.mensaje}
              onChange={handleChange}
              required
              rows={5}
              className="w-full px-4 py-2 rounded-lg bg-gray-100 dark:bg-gray-800 dark:text-white"
            />
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg w-full"
            >
              Enviar
            </button>
          </form>
        )}
      </div>
    </section>
  );
}
