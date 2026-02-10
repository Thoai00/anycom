import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("service_offerings_master_list")
export class ServiceMasterList {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "varchar" })
    service_name!: string;

    @Column({ type: "boolean", default: true })
    is_active!: boolean;
}