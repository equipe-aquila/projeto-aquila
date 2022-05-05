import {
	BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryColumn, PrimaryGeneratedColumn
} from 'typeorm';
import { Prestador } from './Prestador';

@Entity('users')
export class User extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

	@Column({ length: 30 })
	name: string

	@Column({ length: 30 })
	email: string

	@ManyToMany(() => Prestador)
	@JoinTable()
	favoritos: Prestador[]
}

export interface userInput {
	name?: string
	email?: string
}
