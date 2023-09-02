import { User } from "@prisma/client";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import ApiError from "../../../errors/ApiError";
import { exclude } from "../../../helpers/exclude";
import prisma from "../../../shared/prisma";

const getUserProfile = async (jwtPayload: JwtPayload | null): Promise<Omit<User, "id" | "password">> => {
    let user;
    if (jwtPayload?.userId) {
        user = await prisma.user.findUnique({ where: { id: jwtPayload.userId } });
    }

    if (!jwtPayload || !user) {
        throw new ApiError(httpStatus.NOT_FOUND, "Failed to get user");
    }

    const result = exclude(user, ["id", "password"]);

    return result;
};

export const ProfileService = { getUserProfile };
