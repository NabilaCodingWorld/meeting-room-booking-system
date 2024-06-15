import { Router } from "express";
import validateRequest from "../../utils/validateRequest";
import { RoomValidation } from "./room.validation";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../constants";
import { RoomController } from "./room.controller";

const router = Router();

router.post(
  "/",
  auth(USER_ROLE.admin),
  validateRequest(RoomValidation.createRoomValidationSchema),
  RoomController.createRoom
);

router.get("/", RoomController.getAllRooms);
router.get("/:id", RoomController.getSingleRoom);

router.put(
  "/:id",
  auth(USER_ROLE.admin),
  validateRequest(RoomValidation.updateRoomValidationSchema),
  RoomController.updateRoom
  );

router.delete("/:id", RoomController.deleteSingleRoom);

export const RoomRoutes = router;
