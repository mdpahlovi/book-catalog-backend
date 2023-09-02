export type IOptions = {
    page?: number;
    size?: number;
    sortBy?: string;
    sortOrder?: "asc" | "desc";
};

export type IOptionsResult = {
    page: number;
    size: number;
    skip: number;
    sortBy: string;
    sortOrder: "asc" | "desc";
};

export const calculateOptions = (options: IOptions): IOptionsResult => {
    const page = Number(options.page || 1);
    const size = Number(options.size || 10);
    const skip = (page - 1) * size;

    const sortBy = options.sortBy || "publicationDate";
    const sortOrder = options.sortOrder || "asc";

    return {
        page,
        size,
        skip,
        sortBy,
        sortOrder,
    };
};
