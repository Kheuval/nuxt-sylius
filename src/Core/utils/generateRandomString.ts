export const generateRandomString = (length: number) => {
  const lowerCaseLetters = "abcdefghijklmnopqrstuvwxyz";
  const upperCaseLetters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const digits = "0123456789";
  const specialCharacters = "-_~";

  const allCharacters =
    lowerCaseLetters + upperCaseLetters + digits + specialCharacters;

  let randomString = "";

  for (let i = 0; i < length; i++) {
    randomString +=
      allCharacters[Math.floor(Math.random() * allCharacters.length)];
  }

  return randomString;
};
