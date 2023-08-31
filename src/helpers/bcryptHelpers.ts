import bcrypt from "bcrypt";
import config from "../config";

const hashPassword = async (password: string): Promise<string> => {
    return await bcrypt.hash(password, Number(config.salt_round));
};
const comparePassword = async function (givenPassword: string, savedPassword: string): Promise<boolean> {
    return await bcrypt.compare(givenPassword, savedPassword);
};

export const bcryptHelpers = {
    hashPassword,
    comparePassword,
};
