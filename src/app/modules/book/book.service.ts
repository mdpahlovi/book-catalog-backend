import { Book, Prisma } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { paginationHelpers } from "../../../helpers/paginationHelper";
import { searchQuery } from "../../../helpers/searchQuery";
import { IGenericResponse } from "../../../interfaces/common";
import { IPaginationOptions } from "../../../interfaces/pagination";
import prisma from "../../../shared/prisma";
import { bookSearchableFields } from "./book.constant";
import { IBookFilterRequest } from "./book.interface";

const createBook = async (payload: Book): Promise<Book> => {
    const result = await prisma.book.create({
        data: payload,
        include: { category: true },
    });

    return result;
};

const getAllBooks = async (filters: IBookFilterRequest, options: IPaginationOptions): Promise<IGenericResponse<Book[]>> => {
    const { search, category, minPrice, maxPrice } = filters;
    const { size, page, skip } = paginationHelpers.calculatePagination(options);

    const andConditions = [];

    if (search) {
        andConditions.push(searchQuery(search, bookSearchableFields));
    }

    if (category) {
        andConditions.push({ categoryId: { equals: category } });
    }

    if (minPrice) {
        andConditions.push({ price: { gte: Number(minPrice) } });
    }

    if (maxPrice) {
        andConditions.push({ price: { lte: Number(maxPrice) } });
    }

    const where: Prisma.BookWhereInput = andConditions.length > 0 ? { AND: andConditions } : {};
    const orderBy: Prisma.BookOrderByWithRelationInput =
        options.sortBy && options.sortOrder ? { [options.sortBy]: options.sortOrder } : { publicationDate: "desc" };

    const result = await prisma.book.findMany({ include: { category: true }, where, skip, take: size, orderBy });

    const total = await prisma.book.count({ where });

    return { meta: { page, size, total, totalPage: Math.ceil(total / size) }, data: result };
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
    getAllBooks,
    getSingleBook,
    updateBook,
    deleteBook,
};
