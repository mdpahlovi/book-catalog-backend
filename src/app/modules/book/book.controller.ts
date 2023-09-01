import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
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

export const BookController = { createBook, getSingleBook, updateBook, deleteBook };
