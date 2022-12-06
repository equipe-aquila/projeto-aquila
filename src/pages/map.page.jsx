import React from "react";
import { Header } from "../components/Header";
import MapPage from "../components/Maps";
import Search from "./search.page";
const Map = () => {
  return (
    <div>
      <Header navigation={null} />
      <Search></Search>
      <MapPage back={null}></MapPage>
    </div>
  );
};
export default Map;
