import { Order } from "@prisma/client";
import httpStatus from "http-status";
import { USER_ROLE } from "../../../enums/user";
import ApiError from "../../../errors/ApiError";
import { JwtUser } from "../../../interfaces";
import prisma from "../../../shared/prisma";

const createOrder = async (payload: Order): Promise<Order> => {
    const result = await prisma.order.create({
        data: payload,
    });

    return result;
};

const getAllOrder = async (user: JwtUser | null): Promise<Order[]> => {
    let result;

    if (user?.role === USER_ROLE.ADMIN) {
        result = await prisma.order.findMany({ include: { orderedBooks: true } });
    }
    if (user?.role === USER_ROLE.CUSTOMER) {
        result = await prisma.order.findMany({ where: { userId: user?.userId }, include: { orderedBooks: true } });
    }

    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Failed to get orders");
    }

    return result;
};

const getSingleOrder = async (id: string, user: JwtUser | null): Promise<Order> => {
    let result;

    if (user?.role === USER_ROLE.ADMIN) {
        result = await prisma.order.findUnique({ where: { id }, include: { orderedBooks: true } });
    }
    if (user?.role === USER_ROLE.CUSTOMER) {
        result = await prisma.order.findUnique({ where: { id, userId: user?.userId }, include: { orderedBooks: true } });
    }

    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Failed to get order");
    }

    return result;
};

export const OrderService = {
    createOrder,
    getAllOrder,
    getSingleOrder,
};
