import express from "express";
import { USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { CategoryController } from "./category.controller";
import { CategoryValidation } from "./category.validation";

const router = express.Router();

router.post(
    "/create-category",
    auth(USER_ROLE.ADMIN),
    validateRequest(CategoryValidation.createCategory),
    CategoryController.createCategory,
);

router.get("", CategoryController.getAllCategory);

router.get("/:id", CategoryController.getSingleCategory);

router.patch("/:id", auth(USER_ROLE.ADMIN), validateRequest(CategoryValidation.updateCategory), CategoryController.updateCategory);

router.delete("/:id", auth(USER_ROLE.ADMIN), CategoryController.deleteCategory);

export const CategoryRoutes = router;
