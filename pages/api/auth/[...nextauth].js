import NextAuth from 'next-auth';
import { CredentialsProvider } from 'next-auth/providers';

export default NextAuth({
    providers: [
        CredentialsProvider({
            name: 'users',
            db: {
                collection: 'users',
                client: 'mongodb',
                connectionString: process.env.MONGODB_URI,
                connectionOptions: {
                    useNewUrlParser: true,
                    useUnifiedTopology: true,
                    useCreateIndex: true,
                },
            },
        }),
    ],
    session: {
        jwt: true,
        maxAge: '7d',
    },
    jwt: {
        secret: process.env.JWT_SECRET,
        expiresIn: '7d',
    },
    secret: process.env.NEXT_AUTH_SECRET,
    scopes: {
        users: {
            create: true,
            read: true,
            update: true,
            delete: true,
        },
    },
})





// callbacks: {
//     async jwt({ token, account }) {
//       // Persist the OAuth access_token to the token right after signin
//       if (account) {
//         token.accessToken = account.access_token
//       }
//       return token
//     },
//     async session({ session, token, user }) {
//       // Send properties to the client, like an access_token from a provider.
//       session.accessToken = token.accessToken
//       return session
//     }