// permission.entity.ts
import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn, Column } from 'typeorm';
import { User } from './user.entity';

@Entity({ name: 'permission_tbl' })
export class Permission {
    @PrimaryGeneratedColumn({ name: 'ref_id' })
    ref_id: number;

    // @ManyToOne(() => User, user => user.permissions)
    // @JoinColumn({ name: 'user_id', referencedColumnName: 'ref_id' })
    // user: User;

    @Column({name:'user_id'})
    user_id:number;

    @Column({ name: 'dashboard' })
    dashboard: string;

    @Column({ name: 'analytics' })
    analytics: string;

    @Column({ name: 'sim_details' })
    sim_details: string;

    @Column({ name: 'flow_formula' })
    flow_formula: string;

    @Column({ name: 'farmer_Details' })
    farmer_details: string;

    @Column({ name: 'rid_management' })
    rid_management: string;

    @Column({ name: 'conf_set' })
    conf_set: string;

    @Column({ name: 'agency_master' })
    agency_master: string;

    @Column({ name: 'rmu_fw_upload' })
    rmu_fw_upload: string;

    @Column({ name: 'user_management' })
    user_management: string;

    @Column({ name: 'device_registration' })
    device_registration: string;

    @Column({ name: 'svmanagement' })
    svmanagement: string;

    @Column({ name: 'project_master' })
    project_master: string;

    @Column({ name: 'oem_master' })
    oem_master: string;

    @Column({ name: 'pump_Site' })
    pump_site: string;




























}

