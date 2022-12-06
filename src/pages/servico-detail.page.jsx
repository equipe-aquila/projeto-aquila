import {
  AutoCenter,
  Image,
  NavBar,
  Swiper,
  Toast,
  Space,
  Button,
  Grid,
  Avatar
} from "antd-mobile";
import axios from "axios";
import { addDays, isSameDay, setHours, setMinutes, setSeconds } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router";
import { CustomButton } from "../components/CustomButton";
import DatePicker from "../components/date-picker.component";
import { Header } from "../components/Header";
import { Select } from "../components/Select";
import { PrestadorContext } from "../contexts/prestador.context";
import { UserContext } from "../contexts/user.context";

const ServicoDetail = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const { currentUser } = useContext(UserContext);
  const { selectedPrestador, selectedFunc, setSelectedFunc } =
    useContext(PrestadorContext);

  const [servico, setServico] = useState("");
  const [selectedDay, setSelectedDay] = useState(new Date());

  useEffect(() => {
    const getServico = async () => {
      const res = await axios.get(
        `https://projeto-aquila.herokuapp.com/api/servicos/${id}`
      );

      setServico(res.data);
    };

    getServico();
  }, []);

  const colors = [
    "https://i2.wp.com/therighthairstyles.com/wp-content/uploads/2021/09/1-the-ivy-league-mens-cut.jpg?resize=500%2C592",
    "",
    "",
    ""
  ];

  const items = colors.map((color, index) => (
    <Swiper.Item
      key={index}
      style={{
        height: "250px",
        color: "#fff",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        fontSize: "48px",
        userSelect: "none"
      }}
    >
      <Image
        src={color}
        height={"200px"}
        onClick={() => {
          Toast.show(`你点击了卡片 ${index + 1}`);
        }}
      >
        {index + 1}
      </Image>
    </Swiper.Item>
  ));

  const today = new Date();
  today.setHours(10, 0, 0);
  const days = [today];

  for (let i = 1; i < 6; i++) {
    const newDate = addDays(today, i);
    newDate.setHours(10, 0, 0);
    days.push(newDate);
  }

  const handleDaySelect = (index) => {
    setSelectedDay(days[index]);
  };

  const handleTimeSelect = (e) => {
    const updatedTime = setSeconds(
      setMinutes(setHours(selectedDay, e.target.value), 0),
      0
    );
    setSelectedDay(updatedTime);
  };

  const handleAgendamentoConfirm = async () => {
    await axios.post(
      `https://projeto-aquila.herokuapp.com/api/agendamentos/${currentUser.uid}/agendar/${selectedFunc.id}`,
      {
        servicoId: id,
        data: selectedDay
      }
    );
    setSelectedFunc(null);
    Toast.show("Agendamento realizado com sucesso");
    navigate("/appointments");
  };

  return (
    <>
      <Header />
      <AutoCenter>
        <h1 style={{ textTransform: "uppercase" }}>{servico.titulo}</h1>
      </AutoCenter>
      <AutoCenter>
        <Avatar
          src={servico.imagem}
          style={{ "--size": "128px", borderRadius: "50%" }}
        />
      </AutoCenter>
      <AutoCenter>
        <font style={{ fontSize: "20px", fontWeight: "bold", color: "black" }}>
          Selecione um dia e horário
        </font>
      </AutoCenter>
      <AutoCenter>
        <Space
          style={{
            overflow: "scroll",
            maxWidth: "90vw"
          }}
        >
          {days.map((day, index) => {
            return isSameDay(day, selectedDay) ? (
              <DatePicker
                key={index}
                index={index}
                day={day}
                color="#695496"
                onClick={handleDaySelect}
              />
            ) : (
              <DatePicker
                key={index}
                index={index}
                day={day}
                color="black"
                onClick={handleDaySelect}
              />
            );
          })}
        </Space>
        <Select onChange={(e) => handleTimeSelect(e)} />
      </AutoCenter>

      {/* <PickerView
        columns={[
          [
            { label: "10:00", value: "10" },
            { label: "11:00", value: "11" },
            { label: "12:00", value: "12" },
            { label: "13:00", value: "13" },
            { label: "14:00", value: "14" }
          ]
        ]}
        onChange={(e) => handleTimeSelect(e)}
      /> */}
      <AutoCenter>
        <CustomButton onClick={handleAgendamentoConfirm}>
          Confirmar
        </CustomButton>
      </AutoCenter>
    </>
  );
};

export default ServicoDetail;
