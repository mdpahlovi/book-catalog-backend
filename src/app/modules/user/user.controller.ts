import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { UserService } from "./user.service";

const getAllUser = catchAsync(async (req: Request, res: Response) => {
    const result = await UserService.getAllUser();

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Users retrieved successfully",
        data: result,
    });
});

const getSingleUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserService.getSingleUser(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User fetched successfully",
        data: result,
    });
});

const updateUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserService.updateUser(id, req.body);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User updated successfully",
        data: result,
    });
});

const deleteUser = catchAsync(async (req: Request, res: Response) => {
    const { id } = req.params;
    const result = await UserService.deleteUser(id);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "User deleted successfully",
        data: result,
    });
});

export const UserController = { getAllUser, getSingleUser, updateUser, deleteUser };
