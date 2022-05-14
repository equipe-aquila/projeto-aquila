import {
	BaseEntity, Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn
} from 'typeorm';
import { User } from './User';

@Entity('meio_pagamentos')
export class MeioPagamento extends BaseEntity {
    @PrimaryGeneratedColumn()
	id: number

    @Column({ length: 30 })
	meioPagamento: string

    @Column({ length: 30 })
	numeroCartao: string

    @Column({ length: 30 })
	nomeTitular: string

    @Column({ length: 30 })
	codSeguranca: string

    @Column({ length: 30 })
	validade: string

    @ManyToOne(() => User, (user) => user.meiosPagamento)
	user: User
}

export interface meioPagamentoInput {
	meioPagamento: string
	numeroCartao: string
	nomeTitular: string
	codSeguranca: string
	validade: string
	user: User
}
