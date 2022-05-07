import {
    BaseEntity, Column, Entity, ManyToOne, PrimaryGeneratedColumn
} from 'typeorm';
import { Prestador } from './Prestador';
import { User } from './User';

@Entity('avaliacao')
export class Avaliacao extends BaseEntity {
	@PrimaryGeneratedColumn()
	id: number

    @Column({ type: 'text' })
    avaliacao: string

	@ManyToOne(() => User, (user) => user.avaliacoes)
	user: User

	@ManyToOne(() => Prestador, (prestador) => prestador.avaliacoes)
	prestador: Prestador
}

export interface avaliacaoInput {
	avaliacao: string,
	user: User,
	prestador: Prestador
}
