import dotenv from "dotenv";
import path from "path";

dotenv.config({ path: path.join(process.cwd(), ".env") });

export default {
    env: process.env.NODE_ENV,
    port: process.env.PORT,
    salt_round: process.env.SALT_ROUND,
    database_url: process.env.DATABASE_URL,
    jwt: {
        secret: process.env.SECRET,
        expires_in: process.env.EXPIRES_IN,
    },
};
