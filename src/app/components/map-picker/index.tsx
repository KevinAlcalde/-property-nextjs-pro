'use client';

import { useEffect, useRef } from 'react';
import { MapContainer, TileLayer, Marker, useMapEvents, useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';

const markerIcon = L.icon({
  iconUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png',
  iconRetinaUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png',
  shadowUrl: 'https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png',
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapSync({ lat, lon }: { lat: number; lon: number }) {
  const map = useMap();
  const prevRef = useRef({ lat, lon });
  useEffect(() => {
    if (prevRef.current.lat !== lat || prevRef.current.lon !== lon) {
      map.setView([lat, lon], 16, { animate: true });
      prevRef.current = { lat, lon };
    }
  }, [lat, lon, map]);
  return null;
}

function ClickHandler({ onLocation }: { onLocation: (lat: number, lon: number) => void }) {
  useMapEvents({
    click(e) { onLocation(e.latlng.lat, e.latlng.lng); },
  });
  return null;
}

interface Props {
  lat: number;
  lon: number;
  onLocation: (lat: number, lon: number) => void;
}

export default function MapPicker({ lat, lon, onLocation }: Props) {
  return (
    <MapContainer
      center={[lat, lon]}
      zoom={15}
      style={{ height: '280px', width: '100%', borderRadius: '16px', zIndex: 0 }}
      scrollWheelZoom={false}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />
      <Marker
        position={[lat, lon]}
        icon={markerIcon}
        draggable
        eventHandlers={{
          dragend(e) {
            const pos = (e.target as L.Marker).getLatLng();
            onLocation(pos.lat, pos.lng);
          },
        }}
      />
      <MapSync lat={lat} lon={lon} />
      <ClickHandler onLocation={onLocation} />
    </MapContainer>
  );
}
