import {
  BaseEntity,
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Agendamento } from "./Agendamento";
import { Colaborador } from "./Colaborador";

@Entity("servicos")
export class Servico extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  titulo: string;

  @Column({ type: "text" })
  descricao: string;

  @Column({ length: 255, nullable: true })
  imagem: string;

  @Column()
  preco: number;

  @ManyToOne(() => Colaborador, (colaborador) => colaborador.servicos)
  colaborador: Colaborador;

  @OneToMany(() => Agendamento, (agendamento) => agendamento.servico)
  agendamentos: Agendamento[];

  // @ManyToMany(() => Colaborador)
  // @JoinTable()
  // colaboradores: Colaborador[];
}

export interface servicoInput {
  titulo: string;
  descricao: string;
  preco: number;
  imagem: string;
  colaborador: Colaborador;
}
