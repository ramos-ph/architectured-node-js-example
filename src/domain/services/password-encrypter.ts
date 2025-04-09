interface PasswordEncrypter {
  encrypt(password: string): `${string}.${string}`;
}

export { type PasswordEncrypter };
