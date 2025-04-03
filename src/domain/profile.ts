namespace Profile {
  export type Type = {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
    salt: string;
  };

  type CreateProps = {
    id: string;
    username: string;
    email: string;
    passwordHash: string;
    salt: string;
  };

  export const create = (data: CreateProps): Type => {
    return {
      id: data.id,
      username: data.username,
      email: data.email,
      passwordHash: data.passwordHash,
      salt: data.salt,
    };
  };
}

export { Profile };
