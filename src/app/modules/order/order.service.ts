import { Order, OrderedBook } from "@prisma/client";
import httpStatus from "http-status";
import { JwtPayload } from "jsonwebtoken";
import { USER_ROLE } from "../../../enums/user";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";

const createOrder = async (user: JwtPayload | null, { orderedBooks }: { orderedBooks: OrderedBook[] }): Promise<Order> => {
    const result = await prisma.order.create({
        data: { userId: user?.userId, orderedBooks: { createMany: { data: orderedBooks } } },
        include: { orderedBooks: { select: { bookId: true, quantity: true } } },
    });

    return result;
};

const getAllOrder = async (user: JwtPayload | null): Promise<Order[]> => {
    let result;

    if (user?.role === USER_ROLE.ADMIN) {
        result = await prisma.order.findMany({ include: { orderedBooks: { select: { bookId: true, quantity: true } } } });
    }
    if (user?.role === USER_ROLE.CUSTOMER) {
        result = await prisma.order.findMany({
            where: { userId: user?.userId },
            include: { orderedBooks: { select: { bookId: true, quantity: true } } },
        });
    }

    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Failed to get orders");
    }

    return result;
};

const getSingleOrder = async (id: string, user: JwtPayload | null): Promise<Order> => {
    let result;

    if (user?.role === USER_ROLE.ADMIN) {
        result = await prisma.order.findUnique({ where: { id }, include: { orderedBooks: { select: { bookId: true, quantity: true } } } });
    }
    if (user?.role === USER_ROLE.CUSTOMER) {
        result = await prisma.order.findUnique({
            where: { id, userId: user?.userId },
            include: { orderedBooks: { select: { bookId: true, quantity: true } } },
        });
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
