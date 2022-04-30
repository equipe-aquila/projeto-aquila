import { createConnection } from "typeorm";

export default async () => {
    try {
        const connection = createConnection({
            type: 'postgres',
            username: 'uojyssgxeojarp',
            password: '5ff488f69681ea28e682bd6e499c8b67c803493fee3f05a5ea746ef44a00d545',
            database: 'd4ahtk0vtsf17a',
            host: 'ec2-23-20-224-166.compute-1.amazonaws.com',
            entities: ['src/entities/*.ts'],
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
