import { User } from "../entities/User"

export const getUsers = async () => {
    const users = await User.find()

    return users
}
