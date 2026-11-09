"use client";

import { GoogleMap, InfoWindow, Marker, useLoadScript } from "@react-google-maps/api";
import Image from "next/image";
import { Fragment, useState } from "react";

const CENTRO = { lat: -16.6869, lng: -49.2648 };

// id 1 = sede (ícone diferente)
const filiais = [
  { id: 1,  nome: "Sede",                         lat: -16.719597545737017, lng: -49.29065610808544 },
  { id: 2,  nome: "Setor dos Afonsos",            lat: -16.73961881308889,  lng: -49.26769419144868 },
  { id: 3,  nome: "Faiçalville",                  lat: -16.744697311090025, lng: -49.31881795557049 },
  { id: 4,  nome: "Eli Forte",                    lat: -16.73361351758015,  lng: -49.35228825863339 },
  { id: 5,  nome: "Norte Ferroviário",            lat: -16.654161360809066, lng: -49.26199790822422 },
  { id: 6,  nome: "Recanto do Bosque",            lat: -16.60319693257024,  lng: -49.30436611189596 },
  { id: 7,  nome: "Boa Vista",                    lat: -16.587073731678846, lng: -49.341654095493595 },
  { id: 8,  nome: "14 Bis",                       lat: -16.635386191536497, lng: -49.3989898523177 },
  { id: 9,  nome: "João Brás",                    lat: -16.688402737957688, lng: -49.35104938908731 },
  { id: 10, nome: "Buriti Sereno",                lat: -16.77265034505131,  lng: -49.31031942114354 },
  { id: 11, nome: "Veiga Jardim",                 lat: -16.78524699420472,  lng: -49.27453895787004 },
  { id: 12, nome: "Jardim Itaipú",                lat: -16.78836500523481,  lng: -49.36499778401419 },
  { id: 13, nome: "Cardoso II",                   lat: -16.76494569342303,  lng: -49.32432391320159 },
  { id: 14, nome: "Flor do Ypê",                  lat: -16.656835775689512, lng: -49.13562405238455 },
  { id: 15, nome: "Pedro Miranda",                lat: -16.729951881485526, lng: -49.089200042588494 },
  { id: 16, nome: "Alice Barbosa",                lat: -16.594915641070433, lng: -49.27100487364266 },
  { id: 17, nome: "Itanhangá",                    lat: -16.570161623870188, lng: -49.2790875757447 },
  { id: 18, nome: "Jardim Todos os Santos II",    lat: -16.701815483937505, lng: -49.089931035633775 },
  { id: 19, nome: "Jardim Todos os Santos III",   lat: -16.695656941417777, lng: -49.09183633907889 },
  { id: 20, nome: "Bonfinópolis/GO",              lat: -16.6128445929497,   lng: -48.96331273061476 },
  { id: 21, nome: "Aragoiânia/GO",                lat: -16.921520484159615, lng: -49.44723673153304 },
  { id: 22, nome: "São Bernardo",                 lat: -16.577537606136108, lng: -49.399599419983076 },
  { id: 23, nome: "Anicuns/GO",                   lat: -16.45965196811984,  lng: -49.95524654657013 },
  { id: 24, nome: "Rio Araguaia",                 lat: -16.657842127287832, lng: -49.16011057973828 },
].map((f) => ({
  ...f,
  nome: `AD Missão Jardim América - ${f.nome}`,
  icon: f.id === 1 ? "/images/location/point-sede.png" : "/images/location/point.png",
}));

const Mapa = () => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY || "",
  });

  const [selecionada, setSelecionada] = useState<number | null>(null);
  const [emFoco, setEmFoco] = useState<number | null>(null);

  if (!isLoaded) {
    return (
      <div className="flex h-[600px] w-full items-center justify-center bg-gray-100 text-body-color dark:bg-dark">
        Carregando mapa...
      </div>
    );
  }

  return (
    <div className="h-[600px] w-full">
      <GoogleMap
        mapContainerClassName="w-full h-full"
        center={CENTRO}
        zoom={12}
        options={{ gestureHandling: "greedy", scrollwheel: true }}
      >
        {filiais.map((filial) => (
          <Fragment key={filial.id}>
            <Marker
              position={{ lat: filial.lat, lng: filial.lng }}
              title={filial.nome}
              onClick={() => setSelecionada(filial.id)}
              onMouseOver={() => setEmFoco(filial.id)}
              onMouseOut={() => setEmFoco(null)}
              icon={{ url: filial.icon, scaledSize: new google.maps.Size(26, 32) }}
              label={selecionada === filial.id ? "✔" : undefined}
            />

            {/* Foto do Street View ao passar o mouse */}
            {emFoco === filial.id && (
              <InfoWindow
                position={{ lat: filial.lat, lng: filial.lng }}
                options={{ pixelOffset: new google.maps.Size(0, -30) }}
              >
                <div className="w-[200px] overflow-hidden rounded-[10px]">
                  <Image
                    src={`/api/streetview?lat=${filial.lat}&lng=${filial.lng}`}
                    unoptimized
                    alt={filial.nome}
                    width={200}
                    height={120}
                    className="h-[120px] w-full object-cover"
                  />
                  <div className="p-2 text-xs font-medium">{filial.nome}</div>
                </div>
              </InfoWindow>
            )}
          </Fragment>
        ))}
      </GoogleMap>
    </div>
  );
};

export default Mapa;
