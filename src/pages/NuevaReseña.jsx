import { useState } from "react";

export default function NuevaReseña({ onPublicado }) {
  const [nombre, setNombre] = useState("");
  const [texto, setTexto] = useState("");
  const [servicio, setServicio] = useState("");
  const [estrellas, setEstrellas] = useState(5);
  const [imagen, setImagen] = useState(null);
  const [enviando, setEnviando] = useState(false);
  const [mensaje, setMensaje] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setEnviando(true);
    setMensaje("");

    const formData = new FormData();
    formData.append("nombre", nombre);
    formData.append("texto", texto);
    formData.append("servicio", servicio);
    formData.append("estrellas", estrellas);
    if (imagen) formData.append("imagen", imagen);

    try {
      const res = await fetch("/.netlify/functions/testimonios", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMensaje("¡Testimonio enviado!");
        setNombre("");
        setTexto("");
        setServicio("");
        setEstrellas(5);
        setImagen(null);
        onPublicado?.();
      } else {
        console.error("Error al enviar testimonio:", data);
        setMensaje("Error al enviar testimonio.");
      }
    } catch (err) {
      console.error("Error en la solicitud:", err);
      setMensaje("Error de conexión.");
    }

    setEnviando(false);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 p-4 max-w-xl mx-auto">
      <h2 className="text-xl font-bold">Nuevo Testimonio</h2>

      <input
        type="text"
        placeholder="Nombre"
        value={nombre}
        onChange={(e) => setNombre(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />

      <input
        type="text"
        placeholder="Servicio"
        value={servicio}
        onChange={(e) => setServicio(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />

      <textarea
        placeholder="Tu opinión"
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        required
        className="w-full border p-2 rounded"
      />

      <input
        type="number"
        min="1"
        max="5"
        value={estrellas}
        onChange={(e) => setEstrellas(e.target.value)}
        className="w-full border p-2 rounded"
      />

      <input
        type="file"
        accept="image/*"
        onChange={(e) => setImagen(e.target.files[0])}
        className="w-full"
      />

      <button
        type="submit"
        disabled={enviando}
        className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
      >
        {enviando ? "Enviando..." : "Publicar"}
      </button>

      {mensaje && <p className="text-sm text-green-700">{mensaje}</p>}
    </form>
  );
}
