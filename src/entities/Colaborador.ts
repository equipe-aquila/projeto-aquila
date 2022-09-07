import {
    BaseEntity,
    Column,
    Entity,
    OneToMany,
    PrimaryGeneratedColumn,
  } from "typeorm";
import { Servico } from "./Servico";
import { Prestador } from "./Prestador";

 @Entity("colaborador")
export class Colaborador extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: "text" }) 
  nome_Colaborador: string;

  @OneToMany(() => Servico, (servico) =>servico.colaborador)
  servico: Servico[];
}

export interface servicoInput {
    nome_Colaborador: string
  }
  
  