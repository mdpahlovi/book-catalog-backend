import { Order } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";

const createOrder = async (payload: Order): Promise<Order> => {
    const result = await prisma.order.create({
        data: payload,
    });

    return result;
};

const getAllOrder = async (): Promise<Order[]> => {
    const result = await prisma.order.findMany();

    return result;
};

const getSingleOrder = async (id: string): Promise<Order> => {
    const result = await prisma.order.findUnique({
        where: { id },
    });

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
