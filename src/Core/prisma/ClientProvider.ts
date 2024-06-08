import { PrismaClient } from "@prisma/client";

let client: PrismaClient | null = null;

export const providePrismaClient = () => {
  if (null === client) {
    client = new PrismaClient();
  }

  return client;
};
