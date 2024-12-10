export function encryptPassword(password: string): string {
  return btoa(password);
}

export function decryptPassword(encryptedPassword: string): string {
  return atob(encryptedPassword);
}
