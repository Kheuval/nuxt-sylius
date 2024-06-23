export interface AuthResponse {
  token: string;
  customer: string;
  refresh_token: string;
}

export interface TokenInterface {
  value: string;
  expirationDate: Date;
}

export interface SerializedTokenInterface {
  value: string;
  expirationDate: string;
}
