import { Entity, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from "typeorm";
import { Specialist } from "./Specialist.js";
import { ServiceMasterList } from "./ServiceMasterList.js";

@Entity("service_offerings")
export class ServiceOffering {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne(() => Specialist, (s) => s.offerings, { onDelete: 'CASCADE' })
    @JoinColumn({ name: "specialists" }) 
    specialist!: Specialist;

    @ManyToOne(() => ServiceMasterList)
    @JoinColumn({ name: "service_offerings_master_list_id" }) 
    service_master!: ServiceMasterList;
}