import { useState, useRef } from "react";
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

  // 👇 Referencia al input file
  const fileInputRef = useRef(null);

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
        <h2 className="text-4xl font-bold mb-4 text-center">
          ¿Cómo fue tu experiencia con <span className="text-primary">Vagamocion Travel?</span>
        </h2>

        <label className="block mb-2 font-medium">¡Califícanos con estrellas!</label>
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

        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Tu nombre"
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Servicio recibido"
          value={servicio}
          onChange={(e) => setServicio(e.target.value)}
        />
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Destino visitado"
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
        />
        <textarea
          className="w-full p-2 mb-4 border rounded"
          rows="4"
          placeholder="Cuéntanos cómo fue tu experiencia"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />

        <div className="mb-4">
        <label htmlFor="imagen" className="block mb-2 font-medium">Subir imagen (opcional)</label>

        {/* Input visible pero estilizado como botón */}
        <input
          id="imagen"
          type="file"
          accept="image/*"
          onChange={(e) => setImagen(e.target.files[0])}
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded file:border-0
            file:text-sm file:font-semibold
            file:bg-primary file:text-white
            hover:file:bg-secondary
            cursor-pointer"
        />

          {imagen && (
            <p className="text-sm text-gray-600 mt-2">
              Imagen seleccionada: <strong>{imagen.name}</strong>
            </p>
          )}
        </div>

        <button
          type="submit"
          className="w-full bg-primary hover:bg-secondary text-white py-3 px-4 rounded-full transition"
        >
          Publicar reseña
        </button>

        {mensaje && <p className="text-center mt-4 text-green-600 font-semibold">{mensaje}</p>}
      </form>
    </>
  );
}
