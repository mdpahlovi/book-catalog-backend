import { User } from "@prisma/client";
import httpStatus from "http-status";
import { Secret } from "jsonwebtoken";
import config from "../../../config";
import ApiError from "../../../errors/ApiError";
import { bcryptHelpers } from "../../../helpers/bcryptHelpers";
import { jwtHelpers } from "../../../helpers/jwtHelpers";
import prisma from "../../../shared/prisma";

const createUser = async (payload: User): Promise<Partial<User>> => {
    payload.password = await bcryptHelpers.hashPassword(payload.password);

    const result = await prisma.user.create({
        data: payload,
        select: { id: true, name: true, email: true, role: true, contactNo: true, address: true, profileImg: true },
    });

    return result;
};

const signInUser = async (payload: { email: string; password: string }): Promise<string> => {
    const { email, password } = payload;

    const isExist = await prisma.user.findUnique({ where: { email } });
    if (!isExist) {
        throw new ApiError(httpStatus.NOT_FOUND, "User doesn't exist");
    }

    if (isExist.password && !(await bcryptHelpers.comparePassword(password, isExist.password))) {
        throw new ApiError(httpStatus.UNAUTHORIZED, "Password is incorrect");
    }

    const accessToken = jwtHelpers.createToken(
        { userId: isExist.id, role: isExist.role },
        config.jwt.secret as Secret,
        config.jwt.expires_in as string,
    );

    return accessToken;
};

export const AuthService = {
    createUser,
    signInUser,
};
