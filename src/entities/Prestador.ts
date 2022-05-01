import {
	BaseEntity, Column, Entity, PrimaryColumn
} from 'typeorm';

@Entity('prestador')
export class Prestador extends BaseEntity {
	@PrimaryColumn()
	id: number

	@Column({ length: 30 })
	name: string

	@Column({ length: 30 })
	email: string
}
