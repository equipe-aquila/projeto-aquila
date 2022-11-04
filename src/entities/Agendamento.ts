import {
  BaseEntity,
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
} from "typeorm";
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

  @ManyToOne(() => Prestador, (prestador) => prestador.agendamentos)
  prestador: Prestador;

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
  prestador: Prestador;
  servico: Servico;
}
