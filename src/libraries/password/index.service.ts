import bcrypt from "bcrypt";

export class PasswordService {
  // Number of salt rounds for hashing (higher is more secure but slower)
  private static saltRounds: number = 12;

  /**
   * Hash a plain text password
   * @param password - The plain text password to hash
   * @returns A promise that resolves with the hashed password
   */
  public static async hash(password: string): Promise<string> {
    return await bcrypt.hash(password, PasswordService.saltRounds);
  }

  /**
   * Compare a plain text password with a hashed password
   * @param password - The plain text password
   * @param hash - The hashed password
   * @returns A promise that resolves with a boolean indicating if the passwords match
   */
  public static async compare(
    password: string,
    hash: string
  ): Promise<boolean> {
    return await bcrypt.compare(password, hash);
  }
}
