import express from "express";
import { USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { OrderController } from "./order.controller";
import { OrderValidation } from "./order.validation";

const router = express.Router();

router.post("/create-order", auth(USER_ROLE.CUSTOMER), validateRequest(OrderValidation.createOrder), OrderController.createOrder);

router.get("", auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER), OrderController.getAllOrder);

router.get("/:id", auth(USER_ROLE.ADMIN, USER_ROLE.CUSTOMER), OrderController.getSingleOrder);

export const OrderRoutes = router;
