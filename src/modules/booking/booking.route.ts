import { Router } from "express";
import { BookingController } from "./booking.controller";
import auth from "../../middleware/auth";
import { USER_ROLE } from "../../constants";

const router = Router();

router.post('/',auth(USER_ROLE.user,USER_ROLE.admin),BookingController.createBooking)
router.get("/",auth(USER_ROLE.admin),BookingController.getBookings);

router.get('/my-bookings',auth(USER_ROLE.user,USER_ROLE.admin),BookingController.getMyBookings)

router.put('/:id', auth(USER_ROLE.admin), BookingController.updateBooking);
router.delete('/:id', auth(USER_ROLE.admin), BookingController.deleteBooking);

export const BookingRoutes = router;