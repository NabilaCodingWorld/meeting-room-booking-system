import { Router } from "express";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../constants";
import validateRequest from "../../utils/validateRequest";
import { SlotValidation } from "./slot.validation";
import { SlotController } from "./slot.controller";

const router = Router();

router.post('/',auth(USER_ROLE.admin),validateRequest(SlotValidation.createSlotValidationSchema),SlotController.createSlot);

router.get('/availability', SlotController.getAvailableSlots);


export const SlotRoutes = router;