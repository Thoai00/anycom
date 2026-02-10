import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from "typeorm";
import type { Specialist } from "./Specialist.js";

@Entity("media")
export class Media {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @ManyToOne("Specialist", "media")
    @JoinColumn({ name: "specialist_id" })
    specialist!: Specialist;

    @Column({ type: "varchar" }) 
    file_url!: string;

    @Column({ type: "varchar" }) 
    media_type!: string; 
}