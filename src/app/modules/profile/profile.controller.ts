import { Request, Response } from "express";
import httpStatus from "http-status";
import catchAsync from "../../../shared/catchAsync";
import sendResponse from "../../../shared/sendResponse";
import { ProfileService } from "./profile.service";

const getUserProfile = catchAsync(async (req: Request, res: Response) => {
    const result = await ProfileService.getUserProfile(req.user);

    sendResponse(res, {
        success: true,
        statusCode: httpStatus.OK,
        message: "Profile retrieved successfully",
        data: result,
    });
});

export const ProfileController = { getUserProfile };
