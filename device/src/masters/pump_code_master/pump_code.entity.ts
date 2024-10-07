import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity({ name: 'pump_code_master' })
export class PumpCodeMaster {
  @PrimaryGeneratedColumn()
  ref_id: number;

  @Column({})
  code: string;

  @Column({})
  motor: string;

  @Column({ length: 1000 })
  model: string;

  @Column({ length: 1000 })
  controller: string;

  @Column({ length: 1000 })
  head: string;
}
