class Profile {
  constructor(data) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.passwordHash = data.passwordHash;
    this.salt = data.salt;
  }

  static create(data) {
    return new Profile(data);
  }
}

export { Profile };
