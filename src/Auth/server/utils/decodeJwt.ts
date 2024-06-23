const base64UrlDecode = (base64Url: string) => {
  const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
  const buffer = Buffer.from(base64, "base64");

  return buffer.toString("utf-8");
};

export const decodeJwt = (token: string) => {
  const payload = token.split(".")[1];
  const decodedPayload = JSON.parse(base64UrlDecode(payload));

  return decodedPayload;
};
