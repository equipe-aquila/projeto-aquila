import React from "react";

import { TabBar } from "antd-mobile";
import {
  CalendarOutline,
  EnvironmentOutline,
  HeartOutline,
  SearchOutline,
  UserOutline
} from "antd-mobile-icons";

import { useNavigate, useLocation, Outlet } from "react-router-dom";

const Navigation = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { pathname } = location;

  const setRouteActive = (value) => {
    navigate(value);
  };

  const tabs = [
    {
      key: "/map",
      title: "Mapa",
      icon: <EnvironmentOutline />
    },
    {
      key: "/appointments",
      title: "Agendamentos",
      icon: <CalendarOutline />
    },
    {
      key: "/favourites",
      title: "Favoritos",
      icon: <HeartOutline />
    },
    {
      key: "/profile",
      title: "Perfil",
      icon: <UserOutline />
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

export default Navigation;
