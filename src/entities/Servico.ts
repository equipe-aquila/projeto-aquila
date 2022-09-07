import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Agendamento } from "./Agendamento";
import { Colaborador } from "./Colaborador";
import { Prestador } from "./Prestador";

@Entity("servicos")
export class Servico extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 30 })
  titulo: string;

  @Column({ type: "text" })
  descricao: string;

  @Column({ length: 30, nullable: true })
  imagem: string;

  @Column()
  preco: number;

  @ManyToOne(() => Prestador, (prestador) => prestador.servicos)
  prestador: Prestador;

  @OneToMany(() => Agendamento, (agendamento) => agendamento.servico)
  agendamentos: Agendamento[];

  @OneToOne(() => Colaborador, (colaborador) => colaborador.servico)
  colaborador: Colaborador[];
}

export interface servicoInput {
  titulo: string;
  descricao: string;
  preco: number;
  prestador: Prestador;
}
