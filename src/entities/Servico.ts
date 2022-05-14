import {
	BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { Prestador } from './Prestador';

@Entity('servicos')
export class Servico extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ length: 30 })
	nomeServico: string

    @ManyToOne(() => Prestador, (prestador) => prestador.servicos)
	prestador: Prestador
}

export interface servicoInput {
	nomeServico: string,
	prestador: Prestador
}
