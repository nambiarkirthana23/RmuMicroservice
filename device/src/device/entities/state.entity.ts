// states.entity.ts

import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Vendor } from './vendor.entity';

@Entity('states_tbl')
export class State {
  @PrimaryGeneratedColumn({name:'ref_id'})
  ref_id: number;

  @Column({ length: 45 })
  name: string;

  @Column({ length: 200 })
  url: string;

  @Column({ length: 50 })
  sid: string;

  @OneToMany(() => Vendor, vendor => vendor.state)
  vendors: Vendor[];
}
