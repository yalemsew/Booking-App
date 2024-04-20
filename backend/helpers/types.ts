export class ErrorWithStatus extends Error {
    //status: string;
    constructor(message: string, public statusCode: number) {
        super(message);
    }
}

export interface StandardResponse<T = unknown> {
    success: boolean;
    data: T
}

export interface Token {
    _id: string,
    fullname: string,
    usertype: string,
    email: string
}