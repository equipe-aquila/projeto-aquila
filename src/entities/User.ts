import {
	BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Agendamento } from './Agendamento';
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

	@ManyToMany(() => Prestador)
	@JoinTable()
	favoritos: Prestador[]
}

export interface userInput {
	name?: string
	email?: string
}
