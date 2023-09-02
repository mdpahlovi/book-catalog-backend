import { User } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { bcryptHelpers } from "../../../helpers/bcryptHelpers";
import { exclude } from "../../../helpers/exclude";
import prisma from "../../../shared/prisma";

const getAllUser = async (): Promise<Omit<User, "password">[]> => {
    const users = await prisma.user.findMany();
    const result = users.map(user => exclude(user, ["password"]));

    return result;
};

const getSingleUser = async (id: string): Promise<Omit<User, "password">> => {
    const user = await prisma.user.findUnique({ where: { id } });

    if (!user) {
        throw new ApiError(httpStatus.NOT_FOUND, "Failed to get user");
    }

    const result = exclude(user, ["password"]);

    return result;
};

const updateUser = async (id: string, payload: Partial<User>): Promise<Omit<User, "password">> => {
    if (payload?.password) {
        payload.password = await bcryptHelpers.hashPassword(payload.password);
    }

    const user = await prisma.user.update({ where: { id }, data: payload });

    const result = exclude(user, ["password"]);

    return result;
};

const deleteUser = async (id: string): Promise<Omit<User, "password">> => {
    const user = await prisma.user.delete({ where: { id } });

    const result = exclude(user, ["password"]);

    return result;
};

export const UserService = {
    getAllUser,
    getSingleUser,
    updateUser,
    deleteUser,
};
