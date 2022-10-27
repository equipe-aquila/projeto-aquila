import { NavBar, SearchBar } from "antd-mobile";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PrestadorCard from "../components/prestador-card.component";

const Search = () => {
    const navigate = useNavigate();
    const [prestadores, setPrestadores] = useState([]);
    

    const getPrestadores = async () => {
        const res = await axios('https://projeto-aquila.herokuapp.com/api/prestadores/');
        setPrestadores(res.data);
    }
    const handlePrestadorClick = (id) => {
        navigate(`/prestador/${id}`);
    }

    const aa = (e) => {
        if (e.length > 0) {
            return getPrestadores()
        } setPrestadores([])
        
    }

    return (
        <div style={{display:"flex",justifyContent:"center"}}>
            <div style={{position:"absolute",top: 90, zIndex: 999999, Width:"100%"}}>
        <SearchBar placeholder='Pesquisar estabelecimento' onChange={aa} />
        {prestadores.map((prestador) => {
            return (
                <PrestadorCard key={prestador.id} prestador={prestador} onClick={handlePrestadorClick}/>
            );
        })}
        </div>
        </div>
    );
}

export default Search;
