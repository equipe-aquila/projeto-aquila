import {
	BaseEntity, Column, Entity, OneToMany, PrimaryColumn
} from 'typeorm';
import { Favoritos } from './Favoritos';

@Entity('users')
export class User extends BaseEntity {
	@PrimaryColumn()
	id: number

	@Column({ length: 30 })
	name: string

	@Column({ length: 30 })
	email: string

	@OneToMany(() => Favoritos, (favoritos) => favoritos.user)
	favoritos: Favoritos[]
}
