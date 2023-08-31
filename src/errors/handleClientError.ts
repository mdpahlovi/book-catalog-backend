import { Prisma } from "@prisma/client";
import { IGenericErrorMessage, IGenericErrorResponse } from "../interfaces/error";

const handleClientError = (error: Prisma.PrismaClientKnownRequestError): IGenericErrorResponse => {
    const errors: IGenericErrorMessage[] = [
        {
            path: "",
            message: error.message,
        },
    ];

    return {
        statusCode: 400,
        message: "Cast Error",
        errorMessages: errors,
    };
};

export default handleClientError;
