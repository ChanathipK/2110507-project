import 'next-auth'

declare module 'next-auth' {
    interface Session {
        user: {
            name: string,
            email: string,
            success: boolean,
            _id: string,
            token: string,
            iat: number,
            exp: number,
            jti: string
        }
    }
}
