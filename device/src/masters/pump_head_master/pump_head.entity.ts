import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'pump_head_master' })
export class PumpHeadMaster {
  @PrimaryGeneratedColumn()
  ref_id: number;

  @Column({ length: 100 })
  code: string;

  @Column({ length: 100 })
  description: string;
}
