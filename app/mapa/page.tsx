'use client';

import { GoogleMap, Marker, useLoadScript, InfoWindow } from '@react-google-maps/api';
import { useCallback, useMemo, useState } from 'react';
import Image from 'next/image';

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
    { id: 1, nome: 'AD Missão Jardim América - Sede', lat: -16.719597545737017, lng: -49.29065610808544, icon: '/images/location/point-sede.png', foto: '/images/location/sede.jpg' },
    { id: 2, nome: 'AD Missão Jardim América - Setor dos Afonsos', lat: -16.73961881308889, lng: -49.26769419144868, icon: '/images/location/point.png', foto: '/images/location/sede.jpg' },
    { id: 3, nome: 'AD Missão Jardim América - Faiçalville', lat: -16.744697311090025, lng: -49.31881795557049, icon: '/images/location/point.png', foto: '/images/location/sede.jpg' },
    { id: 4, nome: 'AD Missão Jardim América - Eli Forte', lat: -16.73361351758015, lng: -49.35228825863339, icon: '/images/location/point.png', foto: '/images/location/sede.jpg' },
    { id: 5, nome: 'AD Missão Jardim América - Norte Ferroviário', lat: -16.654161360809066, lng: -49.26199790822422, icon: '/images/location/point.png', foto: '/images/location/sede.jpg' },
    { id: 6, nome: 'AD Missão Jardim América - Recanto do Bosque', lat: -16.60319693257024, lng: -49.30436611189596, icon: '/images/location/point.png', foto: '/images/location/sede.jpg' },
    { id: 7, nome: 'AD Missão Jardim América - Boa Vista', lat: -16.587073731678846, lng: -49.341654095493595, icon: '/images/location/point.png', foto: '/images/location/sede.jpg' },
    { id: 8, nome: 'AD Missão Jardim América - 14 Bis', lat: -16.635386191536497, lng: -49.3989898523177, icon: '/images/location/point.png', foto: '/images/location/sede.jpg' },
    { id: 9, nome: 'AD Missão Jardim América - João Braz', lat: -16.688402737957688, lng: -49.35104938908731, icon: '/images/location/point.png', foto: '/images/location/sede.jpg' },
    { id: 10, nome: 'AD Missão Jardim América - Buriti Sereno', lat: -16.77265034505131, lng: -49.31031942114354, icon: '/images/location/point.png', foto: '/images/location/sede.jpg' },
    { id: 11, nome: 'AD Missão Jardim América - Veiga Jardim', lat: -16.78524699420472, lng: -49.27453895787004, icon: '/images/location/point.png', foto: '/images/location/sede.jpg' },
    { id: 12, nome: 'AD Missão Jardim América - Jardim Itaipú', lat: -16.78836500523481, lng: -49.36499778401419, icon: '/images/location/point.png', foto: '/images/location/sede.jpg' },
    { id: 13, nome: 'AD Missão Jardim América - Cardoso II', lat: -16.76494569342303, lng: -49.32432391320159, icon: '/images/location/point.png', foto: '/images/location/sede.jpg' },
    { id: 14, nome: 'AD Missão Jardim América - Flor do Ipê', lat: -16.656835775689512, lng: -49.13562405238455, icon: '/images/location/point.png', foto: '/images/location/sede.jpg' },
    { id: 15, nome: 'AD Missão Jardim América - Pedro Miranda', lat: -16.729951881485526, lng: -49.089200042588494, icon: '/images/location/point.png', foto: '/images/location/sede.jpg' },
    { id: 16, nome: 'AD Missão Jardim América - Alice Barbosa', lat: -16.594915641070433, lng: -49.27100487364266, icon: '/images/location/point.png', foto: '/images/location/sede.jpg' },
    { id: 17, nome: 'AD Missão Jardim América - Itanhangá (Privê Elza Fronza)', lat: -16.570161623870188, lng: -49.2790875757447, icon: '/images/location/point.png', foto: '/images/location/sede.jpg' },
    { id: 18, nome: 'AD Missão Jardim América - Jardim Todos os Santos II', lat: -16.701815483937505, lng: -49.089931035633775, icon: '/images/location/point.png', foto: '/images/location/sede.jpg' },
    { id: 19, nome: 'AD Missão Jardim América - Jardim Todos os Santos III', lat: -16.695656941417777, lng: -49.09183633907889, icon: '/images/location/point.png', foto: '/images/location/sede.jpg' },
  ];

  const [selectedFilial, setSelectedFilial] = useState<number | null>(null);
  const [hoveredFilial, setHoveredFilial] = useState<number | null>(null);

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
        options={{
          gestureHandling: 'greedy',
          scrollwheel: true,
        }}
      >
        {filialLocations.map((filial) => (
          <div key={filial.id}>
            <Marker
              position={{ lat: filial.lat, lng: filial.lng }}
              title={filial.nome}
              onClick={() => handleMarkerClick(filial.id)}
              onMouseOver={() => setHoveredFilial(filial.id)}
              onMouseOut={() => setHoveredFilial(null)}
              icon={{
                url: filial.icon,
                scaledSize: new google.maps.Size(26, 32),
              }}
              label={selectedFilial === filial.id ? '✔' : undefined}
            />

            {/* 👇 HOVER (imagem) */}
            {hoveredFilial === filial.id && (
              <InfoWindow
                position={{ lat: filial.lat, lng: filial.lng }}
                options={{ pixelOffset: new google.maps.Size(0, -30) }}
              >
                <div
                  style={{
                    width: 200,
                    borderRadius: 10,
                    overflow: 'hidden',
                  }}
                >
                  <Image
                    src={filial.foto}
                    alt={filial.nome}
                    width={200}
                    height={120}
                    style={{
                      width: '100%',
                      height: '120px',
                      objectFit: 'cover',
                    }}
                  />
                  <div
                    style={{
                      padding: 8,
                      fontSize: 12,
                      fontWeight: 500,
                    }}
                  >
                    {filial.nome}
                  </div>
                </div>
              </InfoWindow>
            )}
          </div>
        ))}
      </GoogleMap>
    </div>
  );
};

export default MapaPage;

/*
'use client';

import Breadcrumb from '@/components/Common/Breadcrumb';
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
    { id: 1, nome: 'AD Missão Jardim América - Sede', lat: -16.719597545737017, lng: -49.29065610808544, icon: '/images/location/point-sede.png' },
    { id: 2, nome: 'AD Missão Jardim América - Setor dos Afonsos', lat: -16.73961881308889, lng: -49.26769419144868, icon: '/images/location/point.png' },
    { id: 3, nome: 'AD Missão Jardim América - Faiçalville', lat: -16.744697311090025, lng: -49.31881795557049, icon: '/images/location/point.png' },
    { id: 4, nome: 'AD Missão Jardim América - Eli Forte', lat: -16.73361351758015, lng: -49.35228825863339, icon: '/images/location/point.png' },
    { id: 5, nome: 'AD Missão Jardim América - Norte Ferroviário', lat: -16.654161360809066, lng: -49.26199790822422, icon: '/images/location/point.png' },
    { id: 6, nome: 'AD Missão Jardim América - Recanto do Bosque', lat: -16.60319693257024, lng: -49.30436611189596, icon: '/images/location/point.png' },
    { id: 7, nome: 'AD Missão Jardim América - Boa Vista', lat: -16.587073731678846, lng: -49.341654095493595, icon: '/images/location/point.png' },
    { id: 8, nome: 'AD Missão Jardim América - 14 Bis', lat: -16.635386191536497, lng: -49.3989898523177, icon: '/images/location/point.png' },
    { id: 9, nome: 'AD Missão Jardim América - João Braz', lat: -16.688402737957688, lng: -49.35104938908731, icon: '/images/location/point.png' },
    { id: 10, nome: 'AD Missão Jardim América - Buriti Sereno', lat: -16.77265034505131, lng: -49.31031942114354, icon: '/images/location/point.png' },
    { id: 11, nome: 'AD Missão Jardim América - Veiga Jardim', lat: -16.78524699420472, lng: -49.27453895787004, icon: '/images/location/point.png' },
    { id: 12, nome: 'AD Missão Jardim América - Jardim Itaipú', lat: -16.78836500523481, lng: -49.36499778401419, icon: '/images/location/point.png' },
    { id: 13, nome: 'AD Missão Jardim América - Cardoso II', lat: -16.76494569342303, lng: -49.32432391320159, icon: '/images/location/point.png' },
    { id: 14, nome: 'AD Missão Jardim América - Flor do Ipê', lat: -16.656835775689512, lng: -49.13562405238455, icon: '/images/location/point.png' },
    { id: 15, nome: 'AD Missão Jardim América - Pedro Miranda', lat: -16.729951881485526, lng: -49.089200042588494, icon: '/images/location/point.png' },
    { id: 16, nome: 'AD Missão Jardim América - Alice Barbosa', lat: -16.594915641070433, lng: -49.27100487364266, icon: '/images/location/point.png' },
    { id: 17, nome: 'AD Missão Jardim América - Itanhangá (Privê Elza Fronza)', lat: -16.570161623870188, lng: -49.2790875757447, icon: '/images/location/point.png' },
    { id: 18, nome: 'AD Missão Jardim América - Jardim Todos os Santos II', lat: -16.701815483937505, lng: -49.089931035633775, icon: '/images/location/point.png' },
    { id: 19, nome: 'AD Missão Jardim América - Jardim Todos os Santos III', lat: -16.695656941417777, lng: -49.09183633907889, icon: '/images/location/point.png' },
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
        options={{
          gestureHandling: 'greedy', // Permite zoom com scroll sem precisar apertar Ctrl
          scrollwheel: true,         // Garante que o scroll seja ativado
        }}
      >
        {filialLocations.map((filial) => (
          <Marker
            key={filial.id}
            position={{ lat: filial.lat, lng: filial.lng }}
            title={filial.nome}
            onClick={() => handleMarkerClick(filial.id)}
            icon={{
              url: filial.icon,
              scaledSize: new google.maps.Size(26, 32), // Ajuste o tamanho conforme a imagem
            }}
            label={selectedFilial === filial.id ? '✔' : undefined}
          />
        ))}
      </GoogleMap>
    </div>
  );
};

export default MapaPage;
*/