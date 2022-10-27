import { Marker, useJsApiLoader, } from "@react-google-maps/api";
import React from "react";
import "./Maps.css";
import { GoogleMap } from "@react-google-maps/api";

const MapPage = () => {
  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCldnMI_1AAYc-rrIkTqgAaWnEIcudlDzA",
  });

  const position = {
    lat: -23.52414769555913,
    lng: -46.62231051401248,
  };

  const positionzeze = {
    lat :-23.509230057876472,
    lng :-46.63563502730356,
  }

  const positionlulu = {
    lat :-23.47760170733252,
    lng :-46.56408930362278
  }

  const positionBotox= {
    lat :-23.505261781237717,
    lng :-46.676690865781005
  }

  const positionalgo= {
    lat :-23.57403103263997,
    lng :-46.6910884744566
  }


  return isLoaded ? (
    <div className="map">
    <GoogleMap
      zoom={15}
      mapContainerStyle={{ width: "100%", height: "100%" }}
      center={position}
      options={{
        zoomControl: false,
        disableDefaultUI: true,
        styles: [
          {
            elementType: "labels",
            stylers: [{ visibility: "off" }],
          },
        ],
      }}
    >
      {
      <Marker position={positionzeze} options={{
        label: {
          text: "Manicure",
          className: "map-marker"
        }
      }} />
      }
            {
      <Marker position={position} options={{
        label: {
          text: "Voce",
          className: "map-marker",
        },
        icon: {
          path: 'M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z',
          fillOpacity: 1,
          strokeWeight: 1.8,
          labelOrigin: { x: 0, y: -30 }
      },
      }} />
      }
      {
              <Marker position={positionlulu} options={{
                label: {
                  text: "Cabeleleiro",
                  className: "map-marker"
                }
              }} />
      }
            {
              <Marker position={positionalgo} options={{
                label: {
                  text: "Seu vizinho",
                  className: "map-marker"
                }
              }} />
      }
      {

<Marker position={positionBotox} options={{
  label: {
    text: "Manicure Mai",
    className: "map-marker"
  }
}} />
      }
      <></>
    </GoogleMap>
    </div>
) : <></>
};

export default MapPage;
