import { Category } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";

const createCategory = async (payload: Category): Promise<Category> => {
    const result = await prisma.category.create({
        data: payload,
    });

    return result;
};

const getAllCategory = async (): Promise<Category[]> => {
    const result = await prisma.category.findMany();

    return result;
};

const getSingleCategory = async (id: string): Promise<Category> => {
    const result = await prisma.category.findUnique({
        where: { id },
        include: { books: true },
    });

    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Failed to get category");
    }

    return result;
};

const updateCategory = async (id: string, payload: Partial<Category>): Promise<Category> => {
    const result = await prisma.category.update({
        where: { id },
        data: payload,
    });

    return result;
};

const deleteCategory = async (id: string): Promise<Category> => {
    const result = await prisma.category.delete({
        where: { id },
    });

    return result;
};

export const CategoryService = {
    createCategory,
    getAllCategory,
    getSingleCategory,
    updateCategory,
    deleteCategory,
};
