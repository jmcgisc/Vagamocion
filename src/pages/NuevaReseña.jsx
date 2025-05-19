import { useState } from "react";
import axios from "axios";
import Hero from "../components/Hero";

export default function NuevaReseña({ onPublicado }) {
  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");
  const [servicio, setServicio] = useState("");
  const [estrellas, setEstrellas] = useState(0);
  const [mensaje, setMensaje] = useState("");
  const [imagen, setImagen] = useState(null);

    const handleSubmit = async (e) => {
      e.preventDefault();
    
      if (!nombre || !comentario || !servicio || estrellas === 0) {
        alert("Por favor, completa todos los campos requeridos.");
        return;
      }
    
      const formData = new FormData();
      formData.append("nombre", nombre);
      formData.append("texto", comentario);
      formData.append("servicio", servicio);
      formData.append("estrellas", estrellas);
    
      if (imagen) {
        formData.append("imagen", imagen);
      }
    
      try {
        await axios.post("/.netlify/functions/testimonios", formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        });
        setMensaje("¡Gracias por tu reseña!");
        setNombre("");
        setComentario("");
        setServicio("");
        setEstrellas(0);
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
        <h2 className="text-4xl font-bold mb-4 text-center py-1">¿Cómo fue tu experiencia con </h2>
        <h2 className="text-4xl font-bold mb-4 text-center py-1 text-primary"> Vagamocion Travel?</h2>

        <label className="block mb-2 font-medium py-4">¡Calificanos con estrellas!</label>
        <span className="text-2xl font-semibold mb-6 text-center py-1 text-secondary">
          Si tuviste una gran experiencia, califica con 5 estrellas ⭐️
        </span>
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

        <label className="block mb-2 font-medium">Escribe un comentario</label>
        <textarea
          className="w-full p-2 mb-4 border rounded"
          rows="4"
          placeholder="Cuéntanos cómo fue tu experiencia"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />

        <label className="block mb-2 font-medium">Subir imagen (opcional)</label>
        <input
            type="file"
            accept="image/*"
            className="mb-4"
            onChange={(e) => setImagen(e.target.files[0])}
          />

        <button
          type="submit"
          className="w-full bg-primary hover:bg-secondary text-white py-3 px-4 full-rounded transition"
        >
          Publicar reseña
        </button>

        {mensaje && (
          <p className="text-center mt-4 text-green-600 font-semibold">{mensaje}</p>
        )}
      </form>
    </>
  );
}
