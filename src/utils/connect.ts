import { Agendamento } from "../entities/Agendamento";
import { Avaliacao } from "../entities/Avaliacao";
import { MeioPagamento } from "../entities/MeioPagamento";
import { Prestador } from "../entities/Prestador";
import { Servico } from "../entities/Servico";
import { User } from "../entities/User";
import { createConnection } from "typeorm";
import { Colaborador } from "../entities/Colaborador";

export default async () => {
    try {
        const connection = createConnection({
            type: 'postgres',
            username: 'xhsylswkvjjxzt',
            password: '4172410e6e7a2bbca054d3126a8254c505de28ba955c4b3da7366da0a9934838',
            database: 'd7eul8t2kteh1h',
            host: 'ec2-3-209-124-113.compute-1.amazonaws.com',
            entities: [Agendamento, Avaliacao, MeioPagamento, Prestador, Servico, User, Colaborador],
            synchronize: true,
            ssl: true,
            extra: {
                ssl: {
                rejectUnauthorized: false,
                },
            },
        });

        console.log('connected to postgres')
        return await connection
    } catch (error) {
        console.error(error)
        throw new Error('failed to connect to postgres')
    }

}
