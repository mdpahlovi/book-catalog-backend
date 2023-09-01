import { z } from "zod";

const bookSchema = z.object({
    bookId: z.string({ required_error: "Book Id is required" }),
    quantity: z.number({ required_error: "Quantity is required" }),
});

const createOrder = z.object({
    body: z.object({
        orderedBooks: z.array(bookSchema).min(1, { message: "At Least One Book is required" }),
    }),
});

export const OrderValidation = {
    createOrder,
};
