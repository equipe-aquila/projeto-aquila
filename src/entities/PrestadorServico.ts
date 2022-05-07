import {
	BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn
} from 'typeorm';
import { Prestador } from './Prestador';

@Entity('prestadores')
export class PrestadorServico extends BaseEntity {
	@PrimaryGeneratedColumn()
	id_prestador: number

	@Column({ length: 30 })
	nome: string

	@Column({ length: 16 })
	cpf_cnpj: string

    @Column({ length: 30 })
	portfolio: string

    @Column({ length: 2 })
	tipo_pessoa: string

    @Column({ length: 30 })
	id_servico: string

    @Column({ length: 30 })
	rua: string

    @Column({ length: 30 })
	numero: string

    @Column({ length: 30 })
	bairro: string

    @Column({ length: 30 })
	cidade: string

    @Column({ length: 30 })
	estado: string

    @Column({ length: 30 })
	cep: string

    @Column({ length: 30 })
	login: string

/*	@ManyToMany(() => Prestador)
	@JoinTable()
	favoritos: Prestador[]*/
}

export interface userInput {
	nome?: string
	email?: string
    tipo_pessoa?: string, 
    cpf_cnpj?: string, 
    portfolio?: string, 
    id_servico?: string, 
    rua?: string, 
    numero?: string, 
    bairro?: string, 
    cidade?: string,
    estado?: string,
    cep?: string, 
    login?: string
}
