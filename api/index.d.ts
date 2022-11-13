export {}
declare global {
    namespace Express {
        export interface Request {
            user: User       
        }
    }
}


export type Password = {
    password: string;
}

export type User = {
    id: string;
    isAdmin: string;
}