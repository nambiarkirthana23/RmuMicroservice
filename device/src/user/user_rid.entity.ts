import { Rid } from "src/device/entities/rid.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./user.entity";

@Entity({name:'user_rids'})
export class UserRid{

    @PrimaryGeneratedColumn({name:'ref_id'})
    ref_id:number;

    // @Column({name:'user_id'})
    // user_id:number;

    // @Column({name:'rid'})
    // rid:number;


    @ManyToOne(() => User, user => user.rids)
    @JoinColumn({ name: 'user_id' })
    user: User;
  
    @ManyToOne(() => Rid, rid => rid.users)
    @JoinColumn({ name: 'rid' })
    rid: Rid;
  }





