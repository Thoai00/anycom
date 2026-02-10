import "reflect-metadata";
import { DataSource } from "typeorm";
import * as dotenv from "dotenv";
import { Specialist } from "./entities/Specialist.js";
import { ServiceMasterList } from "./entities/ServiceMasterList.js";
import { ServiceOffering } from "./entities/ServiceOffering.js";
import { PlatformFee } from "./entities/PlatformFee.js";
import { Media } from "./entities/Media.js";

dotenv.config();

export const AppDataSource = new DataSource({
    type: "postgres",
    host: process.env.DB_HOST || "localhost",
    port: parseInt(process.env.DB_PORT || "5432"),
    username: process.env.DB_USERNAME || "postgres",
    password: process.env.DB_PASSWORD || "password",
    database: process.env.DB_NAME || "specialist_db",
    synchronize: true, 
    logging: false,
    entities: [Specialist, ServiceMasterList, ServiceOffering, PlatformFee, Media],
    subscribers: [],
    migrations: [],
});