import {
	BaseEntity, Column, Entity, JoinTable, ManyToMany, OneToMany, PrimaryColumn
} from 'typeorm';
import { Agendamento } from './Agendamento';
import { Avaliacao } from './Avaliacao';
import { MeioPagamento } from './MeioPagamento';
import { Prestador } from './Prestador';

@Entity('users')
export class User extends BaseEntity {
	@PrimaryColumn()
	id: string

	@Column({ length: 255 })
	name: string

	@Column({ length: 255 })
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
