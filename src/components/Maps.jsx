import { Marker, useJsApiLoader } from "@react-google-maps/api";
import React, { useEffect, useState } from "react";
import "./Maps.css";
import { GoogleMap } from "@react-google-maps/api";
import axios from "axios";
import { useContext } from "react";
import { UserContext } from "../contexts/user.context";
import { useNavigate } from "react-router";
import { KoubeiFill } from "antd-mobile-icons";

const MapPage = () => {
  const { loading, setLoading } = useContext(UserContext);
  const navigate = useNavigate();

  const { isLoaded } = useJsApiLoader({
    id: "google-map-script",
    googleMapsApiKey: "AIzaSyCldnMI_1AAYc-rrIkTqgAaWnEIcudlDzA"
  });

  useEffect(() => {
    getPrestadores();
  }, []);

  const [prestadores, setPrestadores] = useState([]);

  const getPrestadores = async () => {
    setLoading(true);
    const res = await axios(
      "https://projeto-aquila.herokuapp.com/api/prestadores/"
    );

    const prestadores = [];
    for await (const prestador of res.data) {
      const bairro = prestador.bairro;
      const cidade = prestador.cidade;
      const estado = prestador.estado;
      const numero = prestador.numero;
      const rua = prestador.rua;

      const endereco = `${rua} ${numero} ${bairro} ${cidade} ${estado}`;
      const { latitude, longitude } = await getCoordinates(endereco);
      if (latitude !== 0 && longitude !== 0) {
        prestador.latitude = latitude;
        prestador.longitude = longitude;
        prestadores.push(prestador);
      }
    }

    setPrestadores(prestadores);
    setLoading(false);
  };

  async function getCoordinates(address) {
    let latitude = null;
    let longitude = null;
    const response = await fetch(
      "https://maps.googleapis.com/maps/api/geocode/json?address=" +
        address +
        "&key=AIzaSyCldnMI_1AAYc-rrIkTqgAaWnEIcudlDzA"
    );
    const data = await response.json();
    if (data.results.length <= 0) return { latitude: 0, longitude: 0 };
    latitude = data.results[0].geometry.location.lat;
    longitude = data.results[0].geometry.location.lng;

    return { latitude, longitude };
  }

  const getUserPosition = () => {
    const userLocation = JSON.parse(localStorage.getItem("userLocation"));
    return {
      lat: userLocation.latitude,
      lng: userLocation.longitude
    };
  };

  const [userLocation, setUserLocation] = useState(getUserPosition());
  return isLoaded ? (
    <div className="map">
      <GoogleMap
        zoom={15}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        center={userLocation}
        options={{
          zoomControl: false,
          disableDefaultUI: true,
          styles: [
            {
              featureType: "administrative",
              elementType: "geometry",
              stylers: [
                {
                  visibility: "off"
                }
              ]
            },
            {
              featureType: "poi",
              stylers: [
                {
                  visibility: "off"
                }
              ]
            },
            {
              featureType: "road",
              elementType: "labels.icon",
              stylers: [
                {
                  visibility: "off"
                }
              ]
            },
            {
              featureType: "transit",
              stylers: [
                {
                  visibility: "off"
                }
              ]
            }
          ]
        }}
      >
        <Marker
          key={Math.random()}
          position={{
            lat: userLocation.lat,
            lng: userLocation.lng
          }}
          options={{
            label: {
              text: "Você",
              className: "map-marker"
            },
            icon: {
              path: "M 0,0 C -2,-20 -10,-22 -10,-30 A 10,10 0 1,1 10,-30 C 10,-22 2,-20 0,0 z",
              fillOpacity: 1,
              strokeWeight: 1.8,
              labelOrigin: { x: 0, y: -30 }
            }
          }}
        />
        {prestadores.map((prestador) => {
          return (
            <Marker
              key={prestador.id}
              position={{
                lat: parseFloat(prestador.latitude),
                lng: parseFloat(prestador.longitude)
              }}
              onClick={() => navigate(`/prestador/${prestador.id}`)}
              options={{
                label: {
                  text: prestador.name,
                  className: "map-marker"
                }
              }}
            />
          );
        })}
      </GoogleMap>
    </div>
  ) : (
    <></>
  );
};

export default MapPage;
