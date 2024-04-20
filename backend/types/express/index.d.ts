declare namespace Express {
    interface Request {
        token: {
            _id: string,
            fullname: string,
            usertype: string,
            email: string
        }
    }
}