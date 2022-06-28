import { MeioPagamento, meioPagamentoInput } from "../entities/MeioPagamento";
import { getConnection } from "typeorm";
import { User, userInput } from "../entities/User";
import { Prestador } from "src/entities/Prestador";

export const getUsers = async () => {
  const users = await User.find();
  return users;
};

export const getUser = async (userId: string) => {
  const user = await User.findOne(userId);

  return user;
};

export const createUser = async (input: userInput) => {
  const user = User.create(input);

  await user.save();

  return user;
};

export const updateUser = async (userId: string, input: userInput) => {
  await User.update(userId, input);

  const updatedUser = await User.findOne(userId);

  return updatedUser;
};

export const deleteUser = async (userId: string) => {
  await User.delete(userId);
};

export const getFavoritos = async (user: User) => {
  const favoritos = await getConnection()
    .createQueryBuilder()
    .relation(User, "favoritos")
    .of(user)
    .loadMany();

  return favoritos;
};

export const addFavorito = async (user: User, prestador: Prestador) => {
  const favorito = await getConnection()
    .createQueryBuilder()
    .relation(User, "favoritos")
    .of(user)
    .add(prestador);

  return favorito;
};

export const deleteFavorito = async (user: User, prestador: Prestador) => {
  const favorito = await getConnection()
    .createQueryBuilder()
    .relation(User, "favoritos")
    .of(user)
    .remove(prestador);

  return favorito;
};

export const addMeioPagamento = async (input: meioPagamentoInput) => {
  const meioPagamento = MeioPagamento.create(input);

  await meioPagamento.save();

  return meioPagamento;
};

export const getMeiosPagamento = async (user: User) => {
  const meiosPagamento = await MeioPagamento.find({ where: { user } });

  return meiosPagamento;
};
