'use client';

import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useCallback, useMemo, useState } from 'react';

const MapaPage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || 'AIzaSyANPuVxL2S1QKar8lsMXC4F-3g1DjHObyw', // Defina a API Key no .env
  });

  const center = useMemo(() => ({
    lat: -16.6869,
    lng: -49.2648,
  }), []);

  const filialLocations = [
    { id: 1, nome: 'Filial Centro', lat: -16.6785, lng: -49.2531 },
    { id: 2, nome: 'Filial Bueno', lat: -16.7047, lng: -49.2637 },
    { id: 3, nome: 'Filial Norte', lat: -16.6500, lng: -49.2500 },
    { id: 4, nome: 'Filial Sul', lat: -16.7200, lng: -49.2900 },
  ];

  const [selectedFilial, setSelectedFilial] = useState<number | null>(null);

  const handleMarkerClick = useCallback((id: number) => {
    setSelectedFilial(id);
  }, []);

  if (!isLoaded) return <div>Carregando mapa...</div>;

  return (
    <div className="h-screen w-full">
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={center}
        zoom={12}
      >
        {filialLocations.map((filial) => (
          <Marker
            key={filial.id}
            position={{ lat: filial.lat, lng: filial.lng }}
            title={filial.nome}
            onClick={() => handleMarkerClick(filial.id)}
            label={selectedFilial === filial.id ? '✔' : undefined}
            icon={{
              url: '/images/point.png', // Caminho relativo à pasta public
              scaledSize: new google.maps.Size(40, 40), // Redimensiona o ícone (opcional)
            }}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default MapaPage;