import {
	BaseEntity, Column, Entity, JoinColumn, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn
} from 'typeorm';
import { Prestador } from './Prestador';

@Entity('servicosGerais')
export class Servicos extends BaseEntity {
	@PrimaryGeneratedColumn()
	id_Servico: number

	@Column({ length: 30 })
	id_prestador: number

	@Column({ length: 16 })
	nome_servico: string 

	@ManyToMany(() => Prestador)
	@JoinTable()
	prestadorServico: Prestador[]
}

export interface userInput {
	id_servico?: number
	id_prestador?: number,
    nome_servico?: string, 
    
}
