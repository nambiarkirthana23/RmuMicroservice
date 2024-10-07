import { Entity, PrimaryGeneratedColumn ,Column} from "typeorm";

@Entity({name:'pump_site'})
export class PumpSite{
@PrimaryGeneratedColumn({name:'ref_id'})
ref_id:number;

@Column({name:'rid'})
rid:string;

@Column({name:'pump_key_number'})
pump_key_number:string;

@Column({name:'hp'})
hp:number;

@Column({name:'rmu_version'})
rmu_version:number;

@Column({name:'pump_set_id'})
pump_set_id:number;

@Column({name:'controller_serial_number'})
controller_serial_number:string;

@Column({name:'motor_serial_number'})
motor_serial_number:string;

@Column({name:'pump_head_serial_number'})
pump_head_serial_number:string;

@Column({name:'pcb_serial_number'})
pcb_serial_number:number;

@Column({name:'hw_version_number'})
hw_version_number:number;

@Column({name:'sw_version_number'})
sw_version_number:number;

@Column({name:'sw_revision_number'})
sw_revision_number:number;

@Column({name:'po_ref'})
po_ref:number;






















}