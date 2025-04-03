type CreateProps = {
  id: string;
  username: string;
  email: string;
  passwordHash: string;
  salt: string;
};

class Profile {
  public readonly id: string;
  public readonly username: string;
  public readonly email: string;
  public readonly passwordHash: string;
  public readonly salt: string;

  constructor(data: CreateProps) {
    this.id = data.id;
    this.username = data.username;
    this.email = data.email;
    this.passwordHash = data.passwordHash;
    this.salt = data.salt;
  }

  static create(data: CreateProps) {
    return new Profile(data);
  }
}

export { Profile };
