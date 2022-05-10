import {
	BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Agendamento } from './Agendamento';
import { Avaliacao } from './Avaliacao';
import { MeioPagamento } from './MeioPagamento';
import { Prestador } from './Prestador';

@Entity('users')
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ length: 30 })
	name: string

	@Column({ length: 30 })
	email: string

	@Column({ nullable: true })
	tipo_pessoa: string

	@Column({ nullable: true })
	rua: string

	@Column({ nullable: true })
	numero: number

	@Column({ nullable: true })
	bairro: string

	@Column({ nullable: true })
	cidade: string

	@Column({ nullable: true })
	estado: string

	@Column({ nullable: true })
	cep: string

	@OneToMany(() => Agendamento, (agendamento) => agendamento.user)
	agendamentos: Agendamento[]

	@OneToMany(() => Avaliacao, (avaliacao) => avaliacao.user)
	avaliacoes: Avaliacao[]

	@OneToMany(() => MeioPagamento, (meioPagamento) => meioPagamento.user)
	meiosPagamento: MeioPagamento[]

	@ManyToMany(() => Prestador)
	@JoinTable()
	favoritos: Prestador[]
}

export interface userInput {
	name?: string
	email?: string
}
