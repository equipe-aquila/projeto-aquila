import {
	BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Agendamento } from './Agendamento';
import { Avaliacao } from './Avaliacao';
import { Servico } from './Servico';

@Entity('prestador')
export class Prestador extends BaseEntity {
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

	@OneToMany(() => Agendamento, (agendamento) => agendamento.prestador)
	agendamentos: Agendamento[]

	@OneToMany(() => Avaliacao, (avaliacao) => avaliacao.prestador)
	avaliacoes: Avaliacao[]

	@OneToMany(() => Servico, (servico) => servico.prestador)
	servicos: Servico[]
}

export interface prestadorInput {
	name: string
	email: string
}
