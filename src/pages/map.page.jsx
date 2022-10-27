import { NavBar, Image} from "antd-mobile";
import React from 'react';
import MapPage from '../components/Maps';
import Search from "./search.page";
const Map  = () => {

    return (
        <div>
            <NavBar style={{marginBottom:"12px",marginTop:"12px",zIndex:999999}} back={null}> 
            <div style={{display:"flex",justifyContent:"center",}}>
            <Image width={110} src="./aquilalogo.png"></Image>
            </div>
            </NavBar>
            <Search></Search>
            <MapPage back={null}></MapPage>

        </div>
    );
    }
export default Map;