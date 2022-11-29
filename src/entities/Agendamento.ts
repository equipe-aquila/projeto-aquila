import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
import { Colaborador } from "./Colaborador";
import { Prestador } from "./Prestador";
import { Servico } from "./Servico";
import { User } from "./User";

@Entity("agendamento")
export class Agendamento extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "timestamptz" })
  data: Date;

  @Column({ default: false })
  pago: boolean;

  @Column({ default: false })
  cancelado: boolean;

  @ManyToOne(() => User, (user) => user.agendamentos)
  user: User;

  @ManyToOne(() => Colaborador, (colaborador) => colaborador.agendamentos)
  colaborador: Colaborador;

  @ManyToOne(() => Servico, (servico) => servico.agendamentos, {
    nullable: true,
  })
  servico: Servico;
}

export interface agendamentoInput {
  data: Date;
  pago?: boolean;
  cancelado?: boolean;
  user: User;
  colaborador: Colaborador;
  servico: Servico;
}
