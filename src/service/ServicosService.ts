import { Servicos, userInput } from "../entities/Servicos"

export const getServicos= async () => {
    const users = await Servicos.find()

    return users
}

export const getServico = async (userId: number) => {
    const user = await Servicos.findOne(userId)

    return user
}

export const createServico= async (input: userInput) => {
    const user = Servicos.create(input)

    await user.save()

    return user
}

export const updateServico  = async (userId: number, input: userInput) => {
    await Servicos.update(userId, input);

    const updatedUser = await Servicos.findOne(userId)

    return updatedUser
}


export const deleteServico  = async (userId: number) => {    
    await Servicos.delete(userId)
}
