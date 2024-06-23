import type {
  SerializedTokenInterface,
  TokenInterface,
} from "~/src/Auth/types/TokenInterface";

export interface SessionInterface {
  key: string;
  expirationDate: Date;
  userId: number;
  accessToken: TokenInterface;
  refreshToken: TokenInterface;
  isExpired(): boolean;
}

export interface SerializedSessionInterface {
  key: string;
  expirationDate: string;
  userId: number;
  accessToken: SerializedTokenInterface;
  refreshToken: SerializedTokenInterface;
}

export type ClientSessionInterface = Omit<
  SessionInterface,
  "userId" | "accessToken" | "refreshToken"
>;
