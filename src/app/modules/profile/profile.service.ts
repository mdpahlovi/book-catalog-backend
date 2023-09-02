import { User } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { exclude } from "../../../helpers/exclude";
import { JwtUser } from "../../../interfaces";
import prisma from "../../../shared/prisma";

const getUserProfile = async (jwtUser: JwtUser | null): Promise<Omit<User, "id" | "password">> => {
    let user;
    if (jwtUser?.userId) {
        user = await prisma.user.findUnique({ where: { id: jwtUser.userId } });
    }

    if (!jwtUser || !user) {
        throw new ApiError(httpStatus.NOT_FOUND, "Failed to get user");
    }

    const result = exclude(user, ["id", "password"]);

    return result;
};

export const ProfileService = { getUserProfile };
