import TestimoniosSlider from "./TestimoniosSlider";
import NuevaReseña from "./NuevaReseña";
import { useState } from "react";

export default function Reseñas() {
  const [refresh, setRefresh] = useState(false);

  const refrescarTestimonios = () => {
    setRefresh(prev => !prev);
  };

  return (
    <div>
      <NuevaReseña onPublicado={refrescarTestimonios} />
      <TestimoniosSlider refresh={refresh} />
    </div>
  );
}
