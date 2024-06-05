import { Router } from "express";
import { contactUs, getUpdateData, tpo_Update } from "../controllers/otherControllers.js";

const router = Router()

router.post('/contact',contactUs)
router.post('/tpo-update',tpo_Update)
router.get('/get-tpo-data',getUpdateData)



export default router