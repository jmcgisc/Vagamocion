import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";

// Arreglar el ícono por defecto de Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require("leaflet/dist/images/marker-icon-2x.png"),
  iconUrl: require("leaflet/dist/images/marker-icon.png"),
  shadowUrl: require("leaflet/dist/images/marker-shadow.png"),
});

export default function MapaInteractivo() {
  return (
    <section className="py-16 bg-blue-50 dark:bg-gray-800">
      <div className="max-w-7xl mx-auto px-6">
        <h2 className="text-3xl font-bold mb-8 text-center text-gray-800 dark:text-white">Encuentra tu destino</h2>
        <div className="h-[500px] rounded-xl overflow-hidden">
          <MapContainer center={[40.4168, -3.7038]} zoom={4} className="h-full w-full">
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a>'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            <Marker position={[40.4168, -3.7038]}>
              <Popup>Madrid - Inicio de tu aventura</Popup>
            </Marker>
          </MapContainer>
        </div>
      </div>
    </section>
  );
}
