import NextAuth from 'next-auth';
import CredentialsProvider from 'next-auth/providers/credentials';
import { MongoDBAdapter } from "@next-auth/mongodb-adapter"
import clientPromise from "../../../lib/utils/mongodb"


export default NextAuth({
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        CredentialsProvider({
            name: 'Email',
            credentials: {
                email: { label: 'Email', type: 'email', placeholder: 'email@email.com' },
                password: { label: 'Password', placeholder: 'password' }
            }
            ,
            authorize: async (credentials, req) => {
                const { email, password } = credentials;

                const res = await fetch("/your/endpoint", {
                    method: 'POST',
                    body: JSON.stringify(credentials),
                    headers: { "Content-Type": "application/json" }
                })
                const user = await res.json()

                // const user = await db.collection('users').findOne({ email });
                if (user) {
                    return user
                } else {
                    return null
                }
            }
        }),

    ]
});

//             db: {
//                 collection: 'users',
//                 client: 'mongodb',
//                 connectionString: process.env.MONGODB_URI,
//                 connectionOptions: {
//                     useNewUrlParser: true,
//                     useUnifiedTopology: true,
//                     useCreateIndex: true,
//                 },
//             },
//         }),
//     ],
//     session: {
//         jwt: true,
//         maxAge: '7d',
//     },
//     jwt: {
//         secret: process.env.JWT_SECRET,
//         expiresIn: '7d',
//     },
//     secret: process.env.NEXT_AUTH_SECRET,
//     scopes: {
//         users: {
//             create: true,
//             read: true,
//             update: true,
//             delete: true,
//         },
//     },
// })





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