import { Entity, PrimaryGeneratedColumn, Column } from "typeorm";

@Entity("platform_fee")
export class PlatformFee {
    @PrimaryGeneratedColumn("uuid") 
    id!: string;

    @Column({ type: "varchar" })
    tier_name!: string;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    min_value!: number;

    @Column({ type: "decimal", precision: 10, scale: 2 })
    max_value!: number;

    @Column({ type: "decimal", precision: 5, scale: 2 })
    platform_fee_percentage!: number;
}