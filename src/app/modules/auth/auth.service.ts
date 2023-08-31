import { User } from "@prisma/client";
import { bcryptHelpers } from "../../../helpers/bcryptHelpers";
import prisma from "../../../shared/prisma";

const createUser = async (payload: User): Promise<Partial<User>> => {
    payload.password = await bcryptHelpers.hashPassword(payload.password);

    const result = await prisma.user.create({
        data: payload,
        select: { id: true, name: true, email: true, role: true, contactNo: true, address: true, profileImg: true },
    });

    return result;
};

export const AuthService = {
    createUser,
};
