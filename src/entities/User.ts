import {
	BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Agendamento } from './Agendamento';
import { Avaliacao } from './Avaliacao';
import { Prestador } from './Prestador';

@Entity('users')
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ length: 30 })
	name: string

	@Column({ length: 30 })
	email: string

	@OneToMany(() => Agendamento, (agendamento) => agendamento.user)
	agendamentos: Agendamento[]

	@OneToMany(() => Avaliacao, (avaliacao) => avaliacao.user)
	avaliacoes: Avaliacao[]

	@ManyToMany(() => Prestador)
	@JoinTable()
	favoritos: Prestador[]}

export interface userInput {
	name?: string
	email?: string
}
