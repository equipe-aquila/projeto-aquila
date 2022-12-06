import React, { useContext, useEffect, useState } from "react";
import { AutoCenter, Avatar, Button, Form, Input, Space } from "antd-mobile";
import { UserContext } from "../contexts/user.context";
import { signOutUser } from "../utils/firebase/firebase.utils";
import { CustomButton } from "./CustomButton";
import axios from "axios";

const EditProfile = () => {
  const { currentUser, loading, setLoading } = useContext(UserContext);
  const [userData, setUserData] = useState({});

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      const res = await axios.get(
        `https://projeto-aquila.herokuapp.com/api/users/${currentUser.uid}`
      );
      setUserData(res.data);
      setLoading(false);
    };

    getUserData();
  }, []);

  const [rua, setRua] = useState(userData.rua);
  const [numero, setNumero] = useState(userData.numero);
  const [bairro, setBairro] = useState(userData.bairro);
  const [cidade, setCidade] = useState(userData.cidade);
  const [estado, setEstado] = useState(userData.estado);
  const [cep, setCEP] = useState(userData.cep);

  useEffect(() => {
    setLoading(true);
    if (
      !userData.rua ||
      !userData.numero ||
      !userData.bairro ||
      !userData.cidade ||
      !userData.estado ||
      !userData.cep
    ) {
      const userLocation = JSON.parse(localStorage.getItem("userLocation"));
      fetch(
        `https://maps.googleapis.com/maps/api/geocode/json?latlng=${userLocation.latitude},${userLocation.longitude}&key=AIzaSyCldnMI_1AAYc-rrIkTqgAaWnEIcudlDzA`
      ).then((r) =>
        r.json().then((r) => {
          const address = r.results[0].address_components;
          setRua(address[1].long_name);
          setNumero(address[0].long_name);
          setBairro(address[2].long_name);
          setCidade(address[3].long_name);
          setEstado(address[4].long_name);
          setCEP(address[5].long_name);
          handleProfileUpdate();
        })
      );
    } else {
      setRua(userData.rua);
      setNumero(userData.numero);
      setBairro(userData.bairro);
      setCidade(userData.cidade);
      setEstado(userData.estado);
      setCEP(userData.cep);
    }
    setLoading(false);
  }, [userData]);

  const handleProfileUpdate = async () => {
    setLoading(true);
    await axios.put(
      `https://projeto-aquila.herokuapp.com/api/users/${currentUser.uid}`,
      {
        rua,
        numero,
        bairro,
        cidade,
        estado,
        cep
      }
    );
    setLoading(false);
  };

  return (
    <>
      <AutoCenter>
        <Space direction="vertical" style={{ marginTop: "3rem" }}>
          <AutoCenter>
            <Avatar
              src={currentUser.photoURL}
              style={{ "--size": "128px", borderRadius: "50%" }}
            />
          </AutoCenter>
          <AutoCenter>
            <h1>{currentUser.displayName}</h1>
          </AutoCenter>

          <Form
            layout="horizontal"
            footer={
              <AutoCenter>
                <CustomButton onClick={handleProfileUpdate}>
                  Salvar
                </CustomButton>
              </AutoCenter>
            }
            fields={[
              {
                name: ["street"],
                value: rua
              },
              {
                name: ["number"],
                value: numero
              },
              {
                name: ["neighborhood"],
                value: bairro
              },
              {
                name: ["city"],
                value: cidade
              },
              {
                name: ["state"],
                value: estado
              },
              {
                name: ["zip"],
                value: cep
              }
            ]}
          >
            <Form.Item name="street" label="Rua">
              <Input placeholder="Rua" onChange={(value) => setRua(value)} />
            </Form.Item>
            <Form.Item name="number" label="Número" initialValue={numero}>
              <Input
                placeholder="Número"
                onChange={(value) => setNumero(value)}
              />
            </Form.Item>
            <Form.Item name="neighborhood" label="Bairro" initialValue={bairro}>
              <Input
                placeholder="Bairro"
                onChange={(value) => setBairro(value)}
              />
            </Form.Item>
            <Form.Item name="city" label="Cidade" initialValue={cidade}>
              <Input
                placeholder="Cidade"
                onChange={(value) => setCidade(value)}
              />
            </Form.Item>
            <Form.Item name="state" label="Estado" initialValue={estado}>
              <Input
                placeholder="Estado"
                onChange={(value) => setEstado(value)}
              />
            </Form.Item>
            <Form.Item name="zip" label="CEP" initialValue={cep}>
              <Input placeholder="CEP" onChange={(value) => setCEP(value)} />
            </Form.Item>
          </Form>
        </Space>
      </AutoCenter>
    </>
  );
};

export default EditProfile;
