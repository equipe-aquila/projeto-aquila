import {
	BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn
} from 'typeorm';
import { Agendamento } from './Agendamento';
import { Prestador } from './Prestador';

@Entity('users')
export class User extends BaseEntity {
	@PrimaryColumn()
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
