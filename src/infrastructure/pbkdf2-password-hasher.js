import crypto from "node:crypto";

class PBKDF2PasswordHasher {
  hash(plainText) {
    const salt = this._generateSalt();
    return {
      hash: this._encryptPassword(plainText, salt),
      salt: salt,
    };
  }

  _encryptPassword(plainText, salt) {
    return crypto
      .pbkdf2Sync(plainText, salt, 100_000, 64, "sha512")
      .toString("hex");
  }

  _generateSalt() {
    return crypto.randomBytes(16).toString("base64");
  }
}

export { PBKDF2PasswordHasher };
