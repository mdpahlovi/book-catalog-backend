import { Book, Prisma } from "@prisma/client";
import httpStatus from "http-status";
import ApiError from "../../../errors/ApiError";
import { IOptions, calculateOptions } from "../../../helpers/paginationHelper";
import { searchQuery } from "../../../helpers/searchQuery";
import { IGenericResponse } from "../../../interfaces/common";
import prisma from "../../../shared/prisma";
import { bookSearchableFields } from "./book.constant";
import { IBookFilter } from "./book.interface";

const createBook = async (payload: Book): Promise<Book> => {
    const result = await prisma.book.create({
        data: payload,
        include: { category: true },
    });

    return result;
};

const getAllBook = async (filters: IBookFilter, options: IOptions): Promise<IGenericResponse<Book[]>> => {
    const { search, category, minPrice, maxPrice } = filters;
    const { size, page, skip, sortBy, sortOrder } = calculateOptions(options);

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

    const where: Prisma.BookWhereInput = { AND: andConditions };
    const orderBy: Prisma.BookOrderByWithRelationInput = { [sortBy]: sortOrder };

    const result = await prisma.book.findMany({ include: { category: true }, where, skip, take: size, orderBy });

    const total = await prisma.book.count({ where });

    return { meta: { page, size, total, totalPage: Math.ceil(total / size) }, data: result };
};

const getSingleCategoryBook = async (categoryId: string, filters: IBookFilter, options: IOptions): Promise<IGenericResponse<Book[]>> => {
    const { search, minPrice, maxPrice } = filters;
    const { size, page, skip, sortBy, sortOrder } = calculateOptions(options);

    const andConditions = [];

    if (search) {
        andConditions.push(searchQuery(search, bookSearchableFields));
    }

    if (minPrice) {
        andConditions.push({ price: { gte: Number(minPrice) } });
    }

    if (maxPrice) {
        andConditions.push({ price: { lte: Number(maxPrice) } });
    }

    const where: Prisma.BookWhereInput = { AND: [{ categoryId }, ...andConditions] };
    const orderBy: Prisma.BookOrderByWithRelationInput = { [sortBy]: sortOrder };

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
    getAllBook,
    getSingleCategoryBook,
    getSingleBook,
    updateBook,
    deleteBook,
};
