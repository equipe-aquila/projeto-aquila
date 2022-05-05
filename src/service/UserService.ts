import { User } from "../entities/User"

export const getUsers = async () => {
    const users = await User.find()

    return users
}

export const getUser = async (userId: number) => {
    const user = await User.findOne(userId)

    return user
}
