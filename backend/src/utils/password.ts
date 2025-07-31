import { hash as bcryptHash, compare as bcryptCompare } from 'bcrypt';

export const hashPassword = (password: string, saltRounds = 10): Promise<string> => {
  return bcryptHash(password, saltRounds);
};

export const comparePasswords = (plain: string, hashed: string): Promise<boolean> => {
  return bcryptCompare(plain, hashed);
};
