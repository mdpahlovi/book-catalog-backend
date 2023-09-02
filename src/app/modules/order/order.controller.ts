import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { OrderService } from "./order.service";

const createOrder = catchAsync(async (req: Request, res: Response) => {
    const result = await OrderService.createOrder(req.user, req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Order created successfully!",
        data: result,
    });
});

const getAllOrder = catchAsync(async (req: Request, res: Response) => {
    const result = await OrderService.getAllOrder(req.user);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Orders fetched successfully",
        data: result,
    });
});

const getSingleOrder = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await OrderService.getSingleOrder(id, req.user);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Order fetched successfully",
        data: result,
    });
});

export const OrderController = { createOrder, getAllOrder, getSingleOrder };
