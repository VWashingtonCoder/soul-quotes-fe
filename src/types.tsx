export interface User {
  id?: number;
  username: string;
  email: string;
  passwordHash: string;
}

export interface UserInput {
  username: string;
  email: string;
  password: string;
}

export type UserCheck = Omit<UserInput, "password">;

export interface UserToken {
  username: string;
  token: string;
}

export type UserLogin = Omit<UserInput, "email">;

export interface Quote {
  id?: number;
  quoteKey: string;
  text: string;
  author: string;
  category: string;
  creatorId: string;
}

export interface Favorite {
  id?: number;
  quoteId: string;
  userId: string;
}
