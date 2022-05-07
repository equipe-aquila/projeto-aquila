import { Usuario, userInput } from "../entities/Usuario"

export const getUsuarios = async () => {
    const users = await Usuario.find()

    return users
}

export const getUsuario = async (userId: number) => {
    const user = await Usuario.findOne(userId)

    return user
}

export const createUsuario= async (input: userInput) => {
    const user = Usuario.create(input)

    await user.save()

    return user
}

export const updateUsuario = async (userId: number, input: userInput) => {
    await Usuario.update(userId, input);

    const updatedUser = await Usuario.findOne(userId)

    return updatedUser
}


export const deleteUsuario = async (userId: number) => {    
    await Usuario.delete(userId)
}
