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
    lat :-23.5436159919714,
    lng :-46.65469221494126,
  }

  const positionlulu = {
    lat :-23.545141256496578,
    lng :-46.65730441722437
  }

  const positionBotox= {
    lat :-23.54603282804938,
    lng :-46.656227386129174
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
          text: "Barbearia do ze",
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
                  text: "Unhas da Lu",
                  className: "map-marker"
                }
              }} />
      }
      {

<Marker position={positionBotox} options={{
  label: {
    text: "Estetica da Le",
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
