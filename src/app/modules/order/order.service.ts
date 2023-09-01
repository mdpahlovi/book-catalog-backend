import { Order, OrderedBook } from "@prisma/client";
import httpStatus from "http-status";
import { USER_ROLE } from "../../../enums/user";
import ApiError from "../../../errors/ApiError";
import { JwtUser } from "../../../interfaces";
import { asyncForEach } from "../../../shared/asyncForEach";
import prisma from "../../../shared/prisma";

const createOrder = async (user: JwtUser, { orderedBooks }: { orderedBooks: OrderedBook[] }): Promise<Order> => {
    const result = await prisma.$transaction(async transactionClient => {
        const newOrder = await transactionClient.order.create({ data: { userId: user.userId } });

        asyncForEach<OrderedBook>(orderedBooks, async (orderedBook: OrderedBook) => {
            await transactionClient.orderedBook.create({
                data: {
                    orderId: newOrder.id,
                    bookId: orderedBook.bookId,
                    quantity: orderedBook.quantity,
                },
            });
        });

        const result = await transactionClient.order.findUnique({
            where: { id: newOrder.id },
            include: { orderedBooks: { select: { bookId: true, quantity: true } } },
        });

        return result;
    });

    if (!result) {
        throw new ApiError(httpStatus.FAILED_DEPENDENCY, "Failed to create order");
    }

    return result;
};

const getAllOrder = async (user: JwtUser | null): Promise<Order[]> => {
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

const getSingleOrder = async (id: string, user: JwtUser | null): Promise<Order> => {
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
