import { connect } from "@planetscale/database";
import { PrismaPlanetScale } from "@prisma/adapter-planetscale";
import dotenv from "dotenv";
import { fetch as undiciFetch } from "undici";

// setup
dotenv.config();
const connectionString = `${process.env.DATABASE_URL}`;

const connection = connect({ url: connectionString, fetch: undiciFetch });
export const planetScaleAdapter = new PrismaPlanetScale(connection);

export * from "@prisma/client";
