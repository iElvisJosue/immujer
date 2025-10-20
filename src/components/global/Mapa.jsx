/* eslint-disable react/prop-types */
import {
  MapContainer,
  TileLayer,
  Marker,
  useMapEvents,
  Popup,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

export default function MapPicker({
  iconoPing = "Imagenes/PinCasa.png",
  textoPin = "Ubicación seleccionada:",
  ubicacion,
  establecerUbicacion = () => {},
  center = [16.85416, -99.85405],
  zoom = 13,
}) {
  // Icono personalizado para el marcador
  const markerIcon = new L.Icon({
    iconUrl: iconoPing,
    iconSize: [41, 41],
    iconAnchor: [20, 41], // [x, y] - punto inferior central del ícono
    popupAnchor: [0, -41], // donde aparece el popup relativo al iconAnchor
  });

  function SeleccionarUbicacion() {
    useMapEvents({
      click(e) {
        establecerUbicacion(e.latlng);
      },
      // Para permitir arrastrar el marcador
      // mouseup(e) {
      //   establecerUbicacion(e.latlng);
      //   onSelect(e.latlng); // Envía las coordenadas al padre
      // },
    });
  }
  return (
    <>
      <MapContainer
        center={center} // Coordenadas iniciales (ej. Parque papagayo)
        zoom={zoom}
        scrollWheelZoom={false}
        style={{
          height: "350px",
          gridColumn: "1 / -1",
          backgroundColor: "gray",
          overflow: "hidden",
          borderRadius: "15px",
        }}
      >
        <SeleccionarUbicacion />
        <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
        {ubicacion && (
          <Marker position={ubicacion} icon={markerIcon}>
            <Popup>
              {textoPin}
              <br />
              <center>
                {ubicacion.lat.toFixed(5)}, {ubicacion.lng.toFixed(5)}
              </center>
            </Popup>
          </Marker>
        )}
      </MapContainer>
      {ubicacion && (
        <a
          href={`https://www.google.com/maps/search/?api=1&query=${ubicacion.lat},${ubicacion.lng}`}
          target="_blank"
          rel="noreferrer"
          style={{
            gridColumn: "1 / -1",
            textAlign: "center",
            fontSize: "10px",
            fontWeight: "bold",
            fontStyle: "italic",
            color: "var(--ColorPrincipal)",
          }}
        >
          Ver en google maps
        </a>
      )}
    </>
  );
}
