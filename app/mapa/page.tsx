'use client';

import { GoogleMap, Marker, useLoadScript } from '@react-google-maps/api';
import { useCallback, useMemo, useState } from 'react';

const MapaPage = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || '',
  });

  const center = useMemo(() => ({
    lat: -16.6869,
    lng: -49.2648,
  }), []);

  // Defina o ícone de cada filial
  const filialLocations = [
    { id: 1, nome: 'Sede AD Missão Jardim América', lat: -16.7195, lng: -49.2906, icon: '/images/point.png' },
    { id: 2, nome: 'Filial Bueno', lat: -16.7047, lng: -49.2637, icon: '/images/point.png' },
    { id: 3, nome: 'Filial Norte', lat: -16.6500, lng: -49.2500, icon: '/images/point.png' },
    { id: 4, nome: 'Filial Sul', lat: -16.7200, lng: -49.2900, icon: '/images/point.png' },
  ];

  const [selectedFilial, setSelectedFilial] = useState<number | null>(null);

  const handleMarkerClick = useCallback((id: number) => {
    setSelectedFilial(id);
  }, []);

  if (!isLoaded) return <div>Carregando mapa...</div>;

  return (
    <div className="h-[600px] w-full">
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
            icon={{
              url: filial.icon,
              scaledSize: new google.maps.Size(32, 32), // Ajuste o tamanho conforme a imagem
            }}
            label={selectedFilial === filial.id ? '✔' : undefined}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default MapaPage;