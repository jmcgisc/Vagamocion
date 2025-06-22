import { useState } from "react";
import axios from "axios";
import Hero from "../components/Hero";

export default function NuevaReseña({ onPublicado }) {
  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");
  const [servicio, setServicio] = useState("");
  const [estrellas, setEstrellas] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [destino, setDestino] = useState("");
  const [imagen, setImagen] = useState(null);

  const subirImagen = async () => {
  if (!imagen) return null;

  const formData = new FormData();
  formData.append("imagen", imagen);

  const { data } = await axios.post("/.netlify/functions/upload-imagen", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });

    if (!data.url) throw new Error("Error obteniendo URL de imagen");
    return data.url;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nombre || !comentario || !servicio || estrellas === 0 || !destino) {
      alert("Por favor, completa todos los campos requeridos.");
      return;
    }

    try {
      let imagen_url = null;
      if (imagen) {
        imagen_url = await subirImagen();
      }

      await axios.post("/.netlify/functions/testimonios", {
        nombre,
        texto: comentario,
        servicio,
        estrellas,
        destino,
        imagen_url,
      });

      setMensaje("¡Gracias por tu reseña!");
      setNombre("");
      setComentario("");
      setServicio("");
      setEstrellas(0);
      setDestino("");
      setImagen(null);
      if (onPublicado) onPublicado();
      setTimeout(() => setMensaje(""), 3000);
    } catch (err) {
      console.error("Error enviando reseña:", err);
      setMensaje("Ocurrió un error. Intenta de nuevo.");
    }
  };

  return (
    <>
      <Hero className="sticky top-0" />
      <form onSubmit={handleSubmit} className="pt-40 max-w-xl mx-auto p-2 bg-white shadow-md">
        <h2 className="text-4xl font-bold mb-4 mt-10 text-center py-1">
          ¿Cómo fue tu experiencia con
        </h2>
        <h2 className="text-4xl font-bold mb-4 mt-10 text-center py-1 text-primary">
          Vagamocion Travel?
        </h2>

        <label className="block mb-2 font-medium py-4">¡Califícanos con estrellas!</label>
        <div className="flex gap-2 mb-4">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              className={`cursor-pointer text-2xl ${estrellas >= n ? "text-yellow-400" : "text-gray-300"}`}
              onClick={() => setEstrellas(n)}
            >
              ★
            </span>
          ))}
        </div>

        <label className="block mb-2 font-medium">¿Con qué servicio te ayudamos? *</label>
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Ej. Viaje, Hotel, Visado..."
          value={servicio}
          onChange={(e) => setServicio(e.target.value)}
        />

        <label className="block mb-2 font-medium">Nombre</label>
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        <label className="block mb-2 font-medium">¿Qué destino visitaste? *</label>
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Ej. Disney, Cancún, Europa, Asia..."
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
        />

        <label className="block mb-2 font-medium">Escribe un comentario</label>
        <textarea
          className="w-full p-2 mb-4 border rounded"
          rows="4"
          placeholder="Cuéntanos cómo fue tu experiencia"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />

        <label className="block mb-2 font-medium">Subir imagen (opcional)</label>
        <label className="cursor-pointer inline-block bg-primary text-white py-2 px-4 rounded mb-4 hover:bg-secondary">
          Seleccionar imagen
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={(e) => setImagen(e.target.files[0])}
          />
        </label>
        {imagen && <p className="text-sm text-gray-600 mb-4">Archivo seleccionado: {imagen.name}</p>}

        <button
          type="submit"
          className="w-full bg-primary hover:bg-secondary text-white py-3 px-4 full-rounded transition"
        >
          Publicar reseña
        </button>

        {mensaje && <p className="text-center mt-4 text-green-600 font-semibold">{mensaje}</p>}
      </form>
    </>
  );
}
