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
            username: 'postgres',
            password: 'projetoaquila2022',
            database: 'aquila',
            host: 'database-1.cscrmke2ep8r.us-east-1.rds.amazonaws.com',
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
