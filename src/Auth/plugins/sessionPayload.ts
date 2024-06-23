export default definePayloadPlugin(() => {
  definePayloadReducer("session", (data) => {
    if (data && data.state && data.state["$suser-session"]) {
      return {
        key: data.key,
        expirationDate: data.expirationDate,
      };
    }
  });

  definePayloadReviver("session", (data) => {
    return {
      key: data.key,
      expirationDate: data.expirationDate,
      isExpired: () => data.expirationDate <= new Date(),
    };
  });
});
