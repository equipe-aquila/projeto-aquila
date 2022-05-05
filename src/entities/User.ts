import {
	BaseEntity, Column, Entity, JoinTable, ManyToMany, PrimaryColumn
} from 'typeorm';
import { Prestador } from './Prestador';

@Entity('users')
export class User extends BaseEntity {
	@PrimaryColumn()
	id: number

	@Column({ length: 30 })
	name: string

	@Column({ length: 30 })
	email: string

	@ManyToMany(() => Prestador)
	@JoinTable()
	favoritos: Prestador[]
}
