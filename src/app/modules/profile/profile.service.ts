import { User } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { JwtUser } from "../../../interfaces";
import prisma from "../../../shared/prisma";

const getUserProfile = async (user: JwtUser | null): Promise<Partial<User>> => {
    let result;
    if (user?.userId) {
        result = await prisma.user.findUnique({
            where: { id: user?.userId },
            select: { name: true, email: true, role: true, contactNo: true, address: true, profileImg: true },
        });
    }

    if (!user || !result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Failed to get user");
    }

    return result;
};

export const ProfileService = { getUserProfile };
