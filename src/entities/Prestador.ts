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

	@OneToMany(() => Agendamento, (agendamento) => agendamento.prestador)
	agendamentos: Agendamento[]

	@OneToMany(() => Avaliacao, (avaliacao) => avaliacao.prestador)
	avaliacoes: Avaliacao[]

	@OneToMany(() => Servico, (servico) => servico.prestador)
	servicos: Servico[]
}
