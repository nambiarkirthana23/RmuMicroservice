import { Column, Entity, JoinColumn, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'roles_tbl'})
export class UserRoles
{
 
  @PrimaryGeneratedColumn({name:'ref_id'})
  ref_id:number

  @Column({name:'role'})
  role:string;

  
// @OneToMany(() => User, user => user.role)
// users: User[]

}