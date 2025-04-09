interface PasswordEncrypter {
  encrypt(password: string): `${string}.${string}`;
}

export { PasswordEncrypter };
