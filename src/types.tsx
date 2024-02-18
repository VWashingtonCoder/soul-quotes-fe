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

export type UserLogin = Omit<UserInput, "email">;

export interface Quote {
  id?: number;
  quoteKey: string;
  text: string;
  author: string;
  category: string;
  creatorId: string;
}

export type QuoteInput = Omit<Quote, "id" | "creatorId">;

export type QuoteInfo = Omit<QuoteInput, "quoteKey">;

export interface Favorite {
  id?: number;
  quoteId: number;
  userId: number;
}
