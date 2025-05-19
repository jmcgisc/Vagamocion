import { useEffect, useState } from "react";
import NuevaReseña from "./NuevaReseña";
import TestimoniosSlider from "../components/TestimoniosSlider";


export default function TestimoniosPage() {
  const [testimonios, setTestimonios] = useState([]);
  
  

  const cargarTestimonios = async () => {
    try {
    //  const res = await fetch("http://localhost:8080/api/testimonios");
      const res = await fetch("/.netlify/functions/testimonios");
      const data = await res.json();
      
      if (data.error) {
        console.error("Error desde el backend:", data.error);
        return;
      }
      
      setTestimonios(Array.isArray(data) ? [...data].reverse() : []);    } catch (err) {
      console.error("Error al cargar testimonios", err);
    }
  };

  useEffect(() => {
    cargarTestimonios();
  }, []);

  return (
    <div>
      <NuevaReseña onPublicado={cargarTestimonios} />
      <TestimoniosSlider testimonios={testimonios} />
    </div>
  );
}
