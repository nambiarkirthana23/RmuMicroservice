import { PrimaryGeneratedColumn,Column, Entity } from "typeorm";
@Entity({name:'project_details'})
export class FarmerProjectDetails
{
   @PrimaryGeneratedColumn({name:'ref_id'})
   ref_id:number

   @Column({name:'rid'})
   rid:string;
 
  @Column({name:'project_name'})
  project_name:string;

  @Column({name:'supplier_name'})
  supplier_name:string;

  @Column({name:'buyer_name'})
  buyer_name:string;

  @Column({name:'farmer_name'})
  farmer_name:string;

  @Column({name:'district'})
  district:string;

  @Column({name:'taluka'})
  taluka:string;

  @Column({name:'village'})
  village:string;

  @Column({name:'phoneno'})
  phoneno:number;

  @Column({name:'latitude'})
  latitude:number;

  @Column({name:'longitude'})
  longitude:number
}