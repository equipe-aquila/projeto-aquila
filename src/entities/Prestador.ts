import {
	BaseEntity, Column, Entity, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Agendamento } from './Agendamento';
import { Avaliacao } from './Avaliacao';
import { Colaborador } from './Colaborador';
import { Servico } from './Servico';

@Entity('prestador')
export class Prestador extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

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

	@OneToMany(() => Agendamento, (agendamento) => agendamento.prestador)
	agendamentos: Agendamento[]

	@OneToMany(() => Avaliacao, (avaliacao) => avaliacao.prestador)
	avaliacoes: Avaliacao[]

	@OneToMany(() => Colaborador, (colaborador) => colaborador.prestador)
	colaboradores: Colaborador[]
}

export interface prestadorInput {
	name: string
	email: string
}
