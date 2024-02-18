export interface User {
    id?: number;
    username: string;
    email: string;
    passwordHash: string;
}

export interface UserInput {
    username: string;
    password: string;
}

export interface UserResponse {
    user: User;
    token: string;
}

export interface Quote {
    id?: number;
    quoteKey: string;
    text: string;
    author: string;
    category: string;
    creatorId: string;
}

export interface QuoteInput {
    quoteKey?: string;
    text: string;
    author: string;
    category: string;
}

export interface Favorite {
    id?: number;
    quoteId: number;
    userId: number;
}