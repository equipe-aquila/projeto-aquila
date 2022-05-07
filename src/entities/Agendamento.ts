import {
    BaseEntity, Column, Entity, ManyToOne, PrimaryColumn
} from 'typeorm';
import { Prestador } from './Prestador';
import { User } from './User';

@Entity('agendamento')
export class Agendamento extends BaseEntity {
	@PrimaryColumn()
	id: number

    @Column({ type: 'date' })
    data: Date

    @Column({ type: 'time' })
    hora: Date

	@ManyToOne(() => User, (user) => user.agendamentos)
	user: User

	@ManyToOne(() => Prestador, (prestador) => prestador.agendamentos)
	prestador: Prestador
}
