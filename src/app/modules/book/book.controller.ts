import { Request, Response } from "express";
import httpStatus from "http-status";
import { paginationFields } from "../../../constants/pagination";
import catchAsync from "../../../shared/catchAsync";
import pick from "../../../shared/pick";
import sendResponse from "../../../shared/sendResponse";
import { bookFilterableFields } from "./book.constant";
import { BookService } from "./book.service";

const createBook = catchAsync(async (req: Request, res: Response) => {
    const result = await BookService.createBook(req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Book created successfully!",
        data: result,
    });
});

const getAllBook = catchAsync(async (req: Request, res: Response) => {
    const filters = pick(req.query, bookFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await BookService.getAllBook(filters, paginationOptions);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Books fetched successfully",
        meta: result.meta,
        data: result.data,
    });
});

const getSingleCategoryBook = catchAsync(async (req: Request, res: Response) => {
    const { categoryId } = req.params;
    const filters = pick(req.query, bookFilterableFields);
    const paginationOptions = pick(req.query, paginationFields);

    const result = await BookService.getSingleCategoryBook(categoryId, filters, paginationOptions);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Books with associated category data fetched successfully",
        meta: result.meta,
        data: result.data,
    });
});

const getSingleBook = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BookService.getSingleBook(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Book fetched successfully",
        data: result,
    });
});

const updateBook = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BookService.updateBook(id, req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Book updated successfully",
        data: result,
    });
});

const deleteBook = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await BookService.deleteBook(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Book deleted successfully",
        data: result,
    });
});

export const BookController = { createBook, getAllBook, getSingleCategoryBook, getSingleBook, updateBook, deleteBook };
