import { Request, Response } from "express";
import { AppDataSource } from "../data-source.js";
import { Specialist } from "../entities/Specialist.js";
import { ServiceOffering } from "../entities/ServiceOffering.js";
import { Media } from "../entities/Media.js";
import { PlatformFee } from "../entities/PlatformFee.js";

export const upsertSpecialist = async (req: Request, res: Response) => {
    if (!req.body) {
        return res.status(400).json({ success: false, message: "Request body is missing. Ensure Multer is configured." });
    }

    const queryRunner = AppDataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();

    try {
        const { id, title, description, base_price, duration_days, offeringIds } = req.body;
        const files = req.files as Express.Multer.File[] || [];

        const specialistRepo = queryRunner.manager.getRepository(Specialist);
        const feeRepo = queryRunner.manager.getRepository(PlatformFee);
        const priceNum = Number(base_price);
        const feeTier = await feeRepo.createQueryBuilder("fee")
            .where(":price >= fee.min_value AND :price <= fee.max_value", { price: priceNum })
            .getOne();
        
        const percentage = feeTier ? Number(feeTier.platform_fee_percentage) : 10;
        const platform_fee = (priceNum * percentage) / 100;

        const specialistData = {
            title,
            slug: title.toLowerCase().trim().replace(/\s+/g, '-') + "-" + Date.now(),
            description,
            base_price: priceNum,
            platform_fee,
            final_price: priceNum + platform_fee,
            duration_days: Number(duration_days),
            is_draft: false,
        };
        let specialist: Specialist;
        if (id && id !== "null") {
            await specialistRepo.update(id, specialistData);
            specialist = await specialistRepo.findOneByOrFail({ id });
        } else {
            specialist = specialistRepo.create(specialistData);
            specialist = await specialistRepo.save(specialist);
        }

        if (offeringIds) {
            const idsArray = typeof offeringIds === 'string' ? JSON.parse(offeringIds) : offeringIds;
            await queryRunner.manager.delete(ServiceOffering, { specialist: { id: specialist.id } });
            
            const offeringEntries = idsArray.map((mId: string) => ({
                specialist: specialist,
                service_master: { id: mId }
            }));
            await queryRunner.manager.save(ServiceOffering, offeringEntries);
        }

        if (files && files.length > 0) {
            const mediaEntries = files.map(file => ({
                specialist: specialist,
                file_url: `/uploads/${file.filename}`,
                media_type: file.mimetype.startsWith('image') ? 'image' : 'file'
            }));
            await queryRunner.manager.save(Media, mediaEntries);
        }

        await queryRunner.commitTransaction();
        return res.status(200).json({ success: true, data: specialist });

    } catch (error: any) {
        await queryRunner.rollbackTransaction();
        console.error("Database Error:", error);
        return res.status(500).json({ success: false, message: error.message });
    } finally {
        await queryRunner.release();
    }
    
    };
    export const getAllSpecialists = async (req: Request, res: Response) => {
        try {
            const repo = AppDataSource.getRepository(Specialist);
            const results = await repo.find({
                relations: ["media"], 
                order: { created_at: "DESC" }
            });
            return res.status(200).json({ success: true, data: results });
        } catch (error) {
            return res.status(500).json({ success: false, message: "Server Error" });
        }
    };