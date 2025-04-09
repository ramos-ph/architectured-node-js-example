import crypto from "node:crypto";
import { PasswordEncrypter } from "../../domain/services/password-encrypter.ts";

const makePBKDF2PasswordEncrypter = (): PasswordEncrypter => {
  const generateSalt = () => crypto.randomBytes(16).toString("base64");

  const encryptPassword = (password: string, salt: string) =>
    crypto.pbkdf2Sync(password, salt, 100_000, 64, "sha512").toString("hex");

  return {
    encrypt(password) {
      const salt = generateSalt();
      const hash = encryptPassword(password, salt);
      return `${salt}.${hash}`;
    },
  };
};

export { makePBKDF2PasswordEncrypter };
