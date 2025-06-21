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

    const ext = imagen.name.split(".").pop();
    const fileName = `testimonio-${Date.now()}.${ext}`;

    const { data, error } = await fetch("/.netlify/functions/upload-imagen", {
      method: "POST",
      body: JSON.stringify({
        fileName,
        fileType: imagen.type,
      }),
      headers: {
        "Content-Type": "application/json",
      },
    }).then((res) => res.json());

    if (error) throw new Error("Error obteniendo URL firmada");

    // Subimos a la URL firmada
    await fetch(data.signedUrl, {
      method: "PUT",
      headers: {
        "Content-Type": imagen.type,
      },
      body: imagen,
    });

    return data.publicUrl;
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
        {/* campos... igual que antes */}

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

        {mensaje && <p className="text-center mt-4 text-green-600 font-semibold">{mensaje}</p>}
      </form>
    </>
  );
}
