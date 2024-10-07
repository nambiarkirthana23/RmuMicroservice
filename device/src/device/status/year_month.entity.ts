import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity({name:'year_month'})
export class YearMonth
{
  @PrimaryGeneratedColumn({name:'id'})
  id:number;

  @Column({name:'month'})
  month:number;

  @Column({name:'year'})
  year:number;

  @Column({name:'imei_id'})
  imei_id:number;

}