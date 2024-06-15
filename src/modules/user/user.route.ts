import { Router } from "express";
import validateRequest from "../../utils/validateRequest";
import { UserValidation } from "./user.validation";
import { UserController } from "./user.controller";

const router = Router();

router.post('/signup', validateRequest(UserValidation.createUserValidationSchema), UserController.signUp)

router.post('/login',validateRequest(UserValidation.loginValidationSchema),UserController.loginUser)


export const AuthRoutes = router;