import { PrestadorServico, userInput } from "../entities/PrestadorServico"

export const getPrestadores = async () => {
    const users = await PrestadorServico.find()

    return users
}

export const getPrestador = async (userId: number) => {
    const user = await PrestadorServico.findOne(userId)

    return user
}

export const createPrestador = async (input: userInput) => {
    const user = PrestadorServico.create(input)

    await user.save()

    return user
}

export const updatePrestador  = async (userId: number, input: userInput) => {
    await PrestadorServico.update(userId, input);

    const updatedUser = await PrestadorServico.findOne(userId)

    return updatedUser
}


export const deletePrestador  = async (userId: number) => {    
    await PrestadorServico.delete(userId)
}
