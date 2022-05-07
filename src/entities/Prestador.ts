import {
	BaseEntity, Column, Entity, OneToMany, PrimaryColumn
} from 'typeorm';
import { Agendamento } from './Agendamento';

@Entity('prestador')
export class Prestador extends BaseEntity {
	@PrimaryColumn()
	id: number

	@Column({ length: 30 })
	name: string

	@Column({ length: 30 })
	email: string

	@OneToMany(() => Agendamento, (agendamento) => agendamento.prestador)
	agendamentos: Agendamento[]
}
