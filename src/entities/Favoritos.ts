import {
	BaseEntity, Column, Entity, ManyToMany, ManyToOne, PrimaryColumn
} from 'typeorm';
import { User } from './User';

@Entity('favoritos')
export class Favoritos extends BaseEntity {
	@PrimaryColumn()
	id_favorito: number

	@ManyToOne(() => User, (user) => user.favoritos)
    user: User
}
