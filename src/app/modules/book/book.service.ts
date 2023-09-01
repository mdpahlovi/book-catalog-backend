import { Book } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import prisma from "../../../shared/prisma";

const createBook = async (payload: Book): Promise<Book> => {
    const result = await prisma.book.create({
        data: payload,
        include: { category: true },
    });

    return result;
};

const getSingleBook = async (id: string): Promise<Book> => {
    const result = await prisma.book.findUnique({ where: { id } });

    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Failed to get book");
    }

    return result;
};

const updateBook = async (id: string, payload: Partial<Book>): Promise<Book> => {
    const result = await prisma.book.update({
        where: { id },
        data: payload,
    });

    return result;
};

const deleteBook = async (id: string): Promise<Book> => {
    const result = await prisma.book.delete({
        where: { id },
    });

    return result;
};

export const BookService = {
    createBook,
    getSingleBook,
    updateBook,
    deleteBook,
};
