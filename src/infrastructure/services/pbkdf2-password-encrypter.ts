import crypto from "node:crypto";
import { PasswordEncrypter } from "../../domain/services/password-encrypter.ts";

class PBKDF2PasswordEncrypter implements PasswordEncrypter {
  public encrypt(password: string): `${string}.${string}` {
    const salt = this.generateSalt();
    const hash = this.encryptPassword(password, salt);
    return `${salt}.${hash}`;
  }

  private encryptPassword(password: string, salt: string) {
    return crypto
      .pbkdf2Sync(password, salt, 100_000, 64, "sha512")
      .toString("hex");
  }

  private generateSalt() {
    return crypto.randomBytes(16).toString("base64");
  }
}

export { PBKDF2PasswordEncrypter };
