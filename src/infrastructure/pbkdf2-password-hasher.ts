import crypto from "node:crypto";

// TODO: move to create profile use case
class PBKDF2PasswordHasher {
  public hash(plainText: string) {
    const salt = this.generateSalt();
    const hash = this.encryptPassword(plainText, salt);
    return `${salt}.${hash}`;
  }

  private encryptPassword(plainText: string, salt: string) {
    return crypto
      .pbkdf2Sync(plainText, salt, 100_000, 64, "sha512")
      .toString("hex");
  }

  private generateSalt() {
    return crypto.randomBytes(16).toString("base64");
  }
}

export { PBKDF2PasswordHasher };
