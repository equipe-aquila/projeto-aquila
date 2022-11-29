import {
    BaseEntity,
    Column,
    Entity,
    ManyToOne,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
import { Agendamento } from "./Agendamento";
import { Prestador } from "./Prestador";
import { Servico } from "./Servico";

@Entity("colaborador")
export class Colaborador extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  nomeColaborador: string;

  @Column()
  foto_url: string;

  @OneToMany(() => Servico, (servico) => servico.colaborador)
	servicos: Servico[]
  
  @OneToMany(() => Agendamento, (agendamento) => agendamento.colaborador)
	agendamentos: Agendamento[]

  @ManyToOne(() => Prestador, (prestador) => prestador.colaboradores)
	prestador: Prestador
}

export interface colaboradorInput {
  nomeColaborador: string;
  foto_url?: string;
  prestador: Prestador;
}
