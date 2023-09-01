import { User } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { bcryptHelpers } from "../../../helpers/bcryptHelpers";
import prisma from "../../../shared/prisma";

const getAllUser = async (): Promise<Partial<User>[]> => {
    const result = await prisma.user.findMany({
        select: { id: true, name: true, email: true, role: true, contactNo: true, address: true, profileImg: true },
    });

    return result;
};

const getSingleUser = async (id: string): Promise<Partial<User>> => {
    const result = await prisma.user.findUnique({
        where: { id },
        select: { id: true, name: true, email: true, role: true, contactNo: true, address: true, profileImg: true },
    });

    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Failed to get user");
    }

    return result;
};

const updateUser = async (id: string, payload: Partial<User>): Promise<Partial<User>> => {
    if (payload?.password) {
        payload.password = await bcryptHelpers.hashPassword(payload.password);
    }

    const result = await prisma.user.update({
        where: { id },
        data: payload,
        select: { id: true, name: true, email: true, role: true, contactNo: true, address: true, profileImg: true },
    });

    return result;
};

const deleteUser = async (id: string): Promise<Partial<User>> => {
    const result = await prisma.user.delete({
        where: { id },
        select: { id: true, name: true, email: true, role: true, contactNo: true, address: true, profileImg: true },
    });

    return result;
};

export const UserService = {
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
};
