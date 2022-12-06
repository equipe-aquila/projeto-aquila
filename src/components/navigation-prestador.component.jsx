import React from "react";

import { TabBar } from "antd-mobile";
import {
  CalendarOutline,
  HeartOutline,
  UserOutline,
  BillOutline,
  AddCircleOutline
} from "antd-mobile-icons";

import { useNavigate, useLocation, Outlet } from "react-router-dom";

const NavigationPrestador = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value) => {
    navigate(value);
  };

  const tabs = [
    {
      key: "/prestadores",
      title: "Perfil",
      icon: <UserOutline />
    },
    {
      key: "/colaboradores",
      title: "Cadastro",
      icon: <AddCircleOutline />
    },
    {
      key: "/comprovantes",
      title: "Comprovantes",
      icon: <BillOutline />
    }
  ];

  return (
    <>
      <Outlet />
      <div
        style={{
          bottom: 0,
          left: 0,
          position: "fixed",
          width: "100%",
          borderTop: "solid 1px var(--adm-color-border)"
        }}
      >
        <TabBar
          style={{ color: "white", background: "white" }}
          activeKey={pathname}
          onChange={(value) => setRouteActive(value)}
        >
          {tabs.map((item) => (
            <TabBar.Item
              style={{ color: "#7f6aab" }}
              key={item.key}
              icon={item.icon}
              title={item.title}
            />
          ))}
        </TabBar>
      </div>
    </>
  );
};

export default NavigationPrestador;
