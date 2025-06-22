import { useState } from "react";
import axios from "axios";
import Hero from "../components/Hero";

export default function NuevaReseña({ onPublicado }) {
  const [nombre, setNombre] = useState("");
  const [comentario, setComentario] = useState("");
  const [servicio, setServicio] = useState("");
  const [estrellas, setEstrellas] = useState(0);
  const [destino, setDestino] = useState("");
  const [imagen, setImagen] = useState(null);
  const [mensaje, setMensaje] = useState("");

  const subirImagenSigned = async () => {
    const ext = imagen.name.split('.').pop();
    const fileName = `testimonio-${Date.now()}.${ext}`;
    // 1) Pide signed URL
    const { data } = await axios.post("/.netlify/functions/generar-url-firmada", {
      fileName,
      fileType: imagen.type
    });
    if (!data.signedUrl) throw new Error("No se obtuvo signedUrl");
    // 2) Sube directo a Supabase
    await fetch(data.signedUrl, {
      method: "PUT",
      headers: { "Content-Type": imagen.type },
      body: imagen
    });
    return data.publicUrl;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!nombre||!comentario||!servicio||estrellas===0||!destino) {
      return alert("Completa todos los campos");
    }
    try {
      const imagen_url = imagen ? await subirImagenSigned() : null;
      await axios.post("/.netlify/functions/testimonios", {
        nombre, texto: comentario, servicio, estrellas, destino, imagen_url
      });
      setMensaje("¡Gracias!"); 
      // limpia campos...
      setNombre(""); setComentario(""); setServicio("");
      setEstrellas(0); setDestino(""); setImagen(null);
      if(onPublicado) onPublicado();
    } catch(err) {
      console.error(err);
      setMensaje("Error, intenta de nuevo"); 
    }
    setTimeout(()=>setMensaje(""),3000);
  };

  return (
    <>
      <Hero className="sticky top-0" />
      <form onSubmit={handleSubmit} className="pt-40 max-w-xl mx-auto p-4 bg-white shadow-md">
        <h2 className="text-2xl font-bold mb-4 text-center">¿Cómo fue tu experiencia?</h2>
        {/* ... tus inputs de nombre, servicio, destino, estrellas, comentario */}
        <div className="mb-4">
          <label className="block mb-2">Subir imagen (opcional)</label>
          <input
            type="file"
            accept="image/*"
            onChange={e=>setImagen(e.target.files[0])}
            className="block w-full text-sm text-gray-500
               file:py-2 file:px-4 file:border-0
               file:bg-primary file:text-white
               hover:file:bg-secondary cursor-pointer"
          />
          {imagen && <p className="mt-2 text-sm">Seleccionado: {imagen.name}</p>}
        </div>
        <button type="submit" className="w-full bg-primary text-white py-3 rounded">Publicar reseña</button>
        {mensaje && <p className="mt-4 text-center">{mensaje}</p>}
      </form>
    </>
  );
}
