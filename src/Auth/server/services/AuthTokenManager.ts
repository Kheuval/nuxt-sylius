import type {
  SerializedTokenInterface,
  TokenInterface,
} from "~/src/Auth/types/TokenInterface";
import { decodeJwt } from "~/src/Auth/server/utils/decodeJwt";

export const useAuthTokenManager = () => {
  const createToken = (
    token: string,
    expiration: number | null = null,
  ): TokenInterface => {
    const expirationDate = new Date();

    if (null !== expiration) {
      expirationDate.setTime(expirationDate.getTime() + expiration * 1000);
    } else {
      expirationDate.setTime(decodeJwt(token).exp * 1000);
    }

    return {
      value: token,
      expirationDate,
    };
  };

  const deserializeToken = (
    serializedToken: SerializedTokenInterface,
  ): TokenInterface => ({
    value: serializedToken.value,
    expirationDate: new Date(serializedToken.expirationDate),
  });

  return { createToken, deserializeToken };
};
