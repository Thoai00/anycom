import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany } from "typeorm";
import type { Media } from "./Media.js";
import type { ServiceOffering } from "./ServiceOffering.js";

@Entity("specialists")
export class Specialist {
    @PrimaryGeneratedColumn("uuid")
    id!: string;

    @Column({ type: "decimal", precision: 3, scale: 2, default: 0 })
    average_rating!: number;

    @Column({ type: "boolean", default: true })
    is_draft!: boolean;

    @Column({ type: "int", default: 0 })
    total_number_of_ratings!: number;

    @Column({ type: "varchar" })
    title!: string;

    @Column({ type: "varchar", unique: true })
    slug!: string;

    @Column({ type: "text" })
    description!: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    base_price!: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    platform_fee!: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    final_price!: number;

    @Column({ type: "varchar", default: "pending" })
    verification_status!: string;

    @Column({ type: "boolean", default: false })
    is_verified!: boolean;

    @Column({ type: "int" })
    duration_days!: number;

    @OneToMany("Media", "specialist")
    media!: Media[];

    @OneToMany("ServiceOffering", "specialist")
    offerings!: ServiceOffering[];

    @CreateDateColumn()
    created_at!: Date;

    @UpdateDateColumn()
    updated_at!: Date;
}