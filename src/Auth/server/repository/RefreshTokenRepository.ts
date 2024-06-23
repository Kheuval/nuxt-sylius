import type { Prisma } from "@prisma/client";
import { providePrismaClient } from "~/src/Core/prisma/ClientProvider";

const prisma = providePrismaClient();

const deleteOneByTokenQuery = async (token: string) => {
  // We have to try/catch because the refresh token might already have been deleted on the server
  try {
    await prisma.refresh_tokens.delete({
      where: {
        refresh_token: token,
      },
    });
  } catch {
    // Do nothing
  }
};

export type DeleteTokenResult = Prisma.PromiseReturnType<
  typeof deleteOneByTokenQuery
>;

export const useRefreshTokenRepository = () => {
  const deleteToken = async (token: string) =>
    await deleteOneByTokenQuery(token);

  return { deleteToken };
};
