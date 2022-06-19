import { SearchBar } from "antd-mobile";
import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import PrestadorCard from "../components/prestador-card.component";

const Search = () => {
    const navigate = useNavigate();
    const [prestadores, setPrestadores] = useState([]);
    
    useEffect(() => {
        const getPrestadores = async () => {
            const res = await axios('https://projeto-aquila.herokuapp.com/api/prestadores/');
            setPrestadores(res.data);
        }

        getPrestadores();
    }, []);

    const handlePrestadorClick = (id) => {
        navigate(`/prestador/${id}`);
    }

    return (
        <div>
            <SearchBar placeholder='Pesquisar barbearia' />
            <PrestadorCard prestadores={prestadores} onClick={handlePrestadorClick}/>
        </div>
    );
}

export default Search;
