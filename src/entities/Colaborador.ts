import {
    BaseEntity,
    Column,
    Entity,
    PrimaryGeneratedColumn,
  } from "typeorm";

@Entity("colaborador")
export class Colaborador extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomeColaborador: string;

  @Column()
  foto_url: string;
}

export interface colaboradorInput {
  nomeColaborador: string;
}
