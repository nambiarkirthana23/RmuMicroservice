import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Permission } from "./permission.entity";
import { Agency } from "src/masters/agency_masters/agency.entity";
import { Rid } from "src/device/entities/rid.entity";

@Entity({name:'users_tbl'})
export class User{

    @PrimaryGeneratedColumn({name:'ref_id'})
    ref_id:number;
    
    @Column()
    role:number;

    // @ManyToOne(() => UserRoles, role => role.users)
    // @JoinColumn({ name: 'role' })
    // role: UserRoles;


    @Column({name:'email'})
    email:string

    @Column({name:'password'})
    password:string;

    @Column({name:'name'})
    name:string;

    @Column({name:'mobile'})
    mobile:string;

    @Column({name:'agency'})
    agency:number;

    // @Column({name:'department'})
    // department:string;

    // @OneToMany(() => Permission, permission => permission.user)
    // permissions: Permission[];

    // @ManyToOne(() => Agency, agency => agency.users)
    // @JoinColumn({ name: 'agency' })
    // agency: Agency;
  
      @Column({name:'department'})
      department:string
  
      @ManyToMany(()=>Rid,rid =>rid.users)
      @JoinTable({name:'user_rids'})
      rids:Rid
   



}