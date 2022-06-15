import { Card, SearchBar } from "antd-mobile";
import axios from "axios";
import { useEffect, useState } from "react";

const Search = () => {
    
    const [prestadores, setPrestadores] = useState([]);

    useEffect(() => {
        const getPrestadores = async () => {
            const res = await axios('https://projeto-aquila.herokuapp.com/api/prestadores/');
            setPrestadores(res.data);
        }

        getPrestadores();
    }, []);

    return (
        <div>
            <SearchBar placeholder='Pesquisar barbearia' />
            {prestadores.map((prestador) => {
                return (
                    <Card title={prestador.name}>
                        {prestador.rua}
                    </Card>
                )
            })}
        </div>
    );
}

export default Search;
