import { useState } from "react";
import { supabase } from '../supabaseClient';
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

  const ext = imagen.name.split('.').pop();
  const fileName = `testimonio-${Date.now()}.${ext}`;

  const { data, error } = await supabase.storage
    .from('testimonios')
    .upload(fileName, imagen, {
      contentType: imagen.type,
      upsert: true,
    });

  if (error) {
    console.error("Error subiendo imagen:", error);
    throw new Error("Error al subir la imagen");
  }

  const { data: { publicUrl } } = supabase.storage
    .from('testimonios')
    .getPublicUrl(fileName);

  return publicUrl;
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

      const { error } = await supabase.from('reseñas').insert([{
        nombre,
        texto: comentario,
        servicio,
        estrellas,
        destino,
        imagen_url,
      }]);

      if (error) throw error;

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
      <form onSubmit={handleSubmit} className="pt-40 max-w-xl mx-auto p-4 bg-white shadow-md">
        <h2 className="text-4xl font-bold mb-4 text-center">
          ¿Cómo fue tu experiencia con <span className="text-primary">Vagamocion Travel?</span>
        </h2>

        <label className="block mb-2 font-medium">Calificación:</label>
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
          placeholder="Nombre"
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
          placeholder="Comentario"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />

        <input
          type="file"
          accept="image/*"
          className="mb-4"
          onChange={(e) => setImagen(e.target.files[0])}
        />

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
