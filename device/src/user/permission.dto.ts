import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class UserPermissionDto{
    @IsNotEmpty()
    @IsNumber()
    user_id:number

    @IsNotEmpty()
    @IsString()
    dashboard: string;

    @IsNotEmpty()
    @IsString()
    analytics: string;

    @IsNotEmpty()
    @IsString()
    sim_details: string;

    @IsNotEmpty()
    @IsString()
    flow_formula: string;

    @IsNotEmpty()
    @IsString()
    farmer_details: string;

    @IsNotEmpty()
    @IsString()
    rid_management: string;

    @IsNotEmpty()
    @IsString()
    conf_set: string;

    @IsNotEmpty()
    @IsString()
    agency_master: string;

    @IsNotEmpty()
    @IsString()
    rmu_fw_upload: string;

    @IsNotEmpty()
    @IsString()
    user_management: string;

    @IsNotEmpty()
    @IsString()
    device_registration: string;

    @IsNotEmpty()
    @IsString()
    svmanagement: string;

    @IsNotEmpty()
    @IsString()
    project_master: string;

    @IsNotEmpty()
    @IsString()
    oem_master: string;

    @IsNotEmpty()
    @IsString()
    pump_site: string;
}