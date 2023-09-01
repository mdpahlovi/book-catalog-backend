import express from "express";
import { USER_ROLE } from "../../../enums/user";
import auth from "../../middlewares/auth";
import validateRequest from "../../middlewares/validateRequest";
import { BookController } from "./book.controller";
import { BookValidation } from "./book.validation";

const router = express.Router();

router.post("/create-book", auth(USER_ROLE.ADMIN), validateRequest(BookValidation.createBook), BookController.createBook);

router.get("", BookController.getAllBook);

router.get("/:categoryId/category", BookController.getSingleCategoryBook);

router.get("/:id", BookController.getSingleBook);

router.patch("/:id", auth(USER_ROLE.ADMIN), validateRequest(BookValidation.updateBook), BookController.updateBook);

router.delete("/:id", auth(USER_ROLE.ADMIN), BookController.deleteBook);

export const BookRoutes = router;
