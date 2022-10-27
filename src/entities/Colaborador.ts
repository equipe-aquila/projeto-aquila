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

  @Column({ type: "text" })
  nomeColaborador: string;
}

export interface servicoInput {
  nomeColaborador: string;
}
