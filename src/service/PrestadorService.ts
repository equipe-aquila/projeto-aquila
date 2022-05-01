import { Prestador } from "../entities/Prestador"

export const getPrestadores = async () => {
    const prestadores = await Prestador.find()

    return prestadores
}