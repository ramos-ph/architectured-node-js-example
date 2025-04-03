import crypto from "node:crypto";

class PBKDF2PasswordHasher {
  public hash(plainText: string) {
    const salt = this.generateSalt();
    // TODO: return string in <salt>.<hash>
    return {
      hash: this.encryptPassword(plainText, salt),
      salt: salt,
    };
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
