import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { CategoryService } from "./category.service";

const createCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await CategoryService.createCategory(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Category created successfully!",
        data: result,
    });
});

const getAllCategory = catchAsync(async (req: Request, res: Response) => {
    const result = await CategoryService.getAllCategory();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Categories fetched successfully",
        data: result,
    });
});

const getSingleCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CategoryService.getSingleCategory(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Category fetched successfully",
        data: result,
    });
});

const updateCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CategoryService.updateCategory(id, req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Category updated successfully",
        data: result,
    });
});

const deleteCategory = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await CategoryService.deleteCategory(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Category deleted successfully",
        data: result,
    });
});

export const CategoryController = { createCategory, getAllCategory, getSingleCategory, updateCategory, deleteCategory };
