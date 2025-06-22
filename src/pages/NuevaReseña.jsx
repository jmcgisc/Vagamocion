import { useState } from "react";
import axios from "axios";
import Hero from "../components/Hero";
import { supabase } from "../lib/supabase";

export default function NuevaReseña({ onPublicado }) {
  const [nombre, setNombre] = useState("");
  const [servicio, setServicio] = useState("");
  const [destino, setDestino] = useState("");
  const [estrellas, setEstrellas] = useState(0);
  const [comentario, setComentario] = useState("");
  const [imagen, setImagen] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const subirImagenSigned = async () => {
    const ext = imagen.name.split(".").pop();
    const fileName = `testimonio-${Date.now()}.${ext}`;

    // 1) Pide signed URL
    const { data } = await axios.post("/.netlify/functions/generar-url-firmada", {
      fileName,
      fileType: imagen.type,
    });
    if (!data.signedUrl) throw new Error("No se obtuvo signedUrl");

    // 2) Sube directo a Supabase
    await fetch(data.signedUrl, {
      method: "PUT",
      headers: { "Content-Type": imagen.type },
      body: imagen,
    });

    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre || !comentario || !servicio || estrellas === 0 || !destino) {
      alert("Completa todos los campos");
      return;
    }

    let imagen_url = null;
    if (imagen) {
      // 1) Generamos un nombre único
      const ext = imagen.name.split(".").pop();
      const fileName = `testimonio-${Date.now()}.${ext}`;
      // 2) Subimos con el cliente anon
      const { error: uploadError } = await supabase.storage
        .from("testimonios")
        .upload(fileName, imagen, { cacheControl: "3600", upsert: false });
      if (uploadError) {
        console.error("Error subiendo imagen:", uploadError);
        setMensaje("Error al subir imagen");
        return;
      }
      // 3) Obtenemos la URL pública
      const { publicURL, error: urlError } = supabase.storage
        .from("testimonios")
        .getPublicUrl(fileName);
      if (urlError) {
        console.error("Error obteniendo URL pública:", urlError);
        setMensaje("Error obteniendo URL de imagen");
        return;
      }
      imagen_url = publicURL;
    }

    // 4) Insertamos el testimonio (sin la parte de imagen que ya subimos)
    try {
      await axios.post(
        "/.netlify/functions/testimonios",
        { nombre, texto: comentario, servicio, estrellas, destino, imagen_url },
        { headers: { "Content-Type": "application/json" } }
      );
      setMensaje("¡Reseña publicada!");
      setNombre("");
      setComentario("");
      setServicio("");
      setEstrellas(0);
      setDestino("");
      setImagen(null);
      onPublicado?.();
      setTimeout(() => setMensaje(""), 3000);
    } catch (err) {
      console.error("Error enviando testimonio:", err);
      setMensaje("Error al publicar reseña");
    }
  };

  return (
    <>
      <Hero className="sticky top-0" />
      <form onSubmit={handleSubmit} className="pt-40 max-w-xl mx-auto p-6 bg-white shadow-md rounded-lg">
        <h2 className="text-3xl font-bold mb-6 text-center">
          ¿Cómo fue tu experiencia con <span className="text-primary">Vagamocion Travel?</span>
        </h2>

        {/* Nombre */}
        <label className="block mb-2 font-medium">Nombre *</label>
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Nombre..."
          value={nombre}
          onChange={(e) => setNombre(e.target.value)}
        />

        {/* Servicio */}
        <label className="block mb-2 font-medium">Servicio recibido *</label>
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Ej. Vuelo, Hotel, Tour..."
          value={servicio}
          onChange={(e) => setServicio(e.target.value)}
        />

        {/* Destino */}
        <label className="block mb-2 font-medium">Destino visitado *</label>
        <input
          type="text"
          className="w-full p-2 mb-4 border rounded"
          placeholder="Ej. París, Cancún, Tokio..."
          value={destino}
          onChange={(e) => setDestino(e.target.value)}
        />

        {/* Calificación */}
        <label className="block mb-2 font-medium">Calificación *</label>
        <div className="flex gap-2 mb-6">
          {[1, 2, 3, 4, 5].map((n) => (
            <span
              key={n}
              className={`cursor-pointer text-3xl ${estrellas >= n ? "text-yellow-400" : "text-gray-300"}`}
              onClick={() => setEstrellas(n)}
            >
              ★
            </span>
          ))}
        </div>

        {/* Comentario */}
        <label className="block mb-2 font-medium">Comentario *</label>
        <textarea
          className="w-full p-2 mb-4 border rounded"
          rows="5"
          placeholder="Cuéntanos tu experiencia"
          value={comentario}
          onChange={(e) => setComentario(e.target.value)}
        />

        {/* Imagen */}
        <label className="block mb-2 font-medium">Subir imagen (opcional)</label>
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setImagen(e.target.files[0])} 
          className="block w-full text-sm text-gray-500
            file:mr-4 file:py-2 file:px-4
            file:rounded file:border-0
            file:text-sm file:font-semibold
            file:bg-primary file:text-white
            hover:file:bg-secondary
            cursor-pointer mb-4"
        />
        {imagen && (
          <p className="text-sm text-gray-600 mb-4">
            Imagen seleccionada: <strong>{imagen.name}</strong>
          </p>
        )}

        {/* Botón */}
        <button
          type="submit"
          className="w-full bg-primary hover:bg-secondary text-white py-3 rounded-full font-semibold transition"
        >
          Publicar reseña
        </button>

        {mensaje && (
          <p className="text-center mt-4 text-green-600 font-medium">{mensaje}</p>
        )}
      </form>
    </>
  );
}
