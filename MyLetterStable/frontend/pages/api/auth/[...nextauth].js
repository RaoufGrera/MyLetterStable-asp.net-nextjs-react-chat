import NextAuth from 'next-auth'
import FacebookProvider from 'next-auth/providers/facebook'
import { accountService } from 'src/_services'
export default NextAuth({
    providers: [
        // OAuth authentication providers...

        FacebookProvider({
            clientId: process.env.FACEBOOK_ID,
            clientSecret: process.env.FACEBOOK_SECRET,

        }),


    ],
    callbacks: {
        async signIn({ user, account, profile, email, credentials }) {
            //  accountService.loginFB(user).then(function (response) { user.accessToken = response.accessToken; })
            user.accessToken = "MyToken :)"
            return true
        },
        async redirect({ url, baseUrl }) {
            return baseUrl
        },
        async session({ session, user, token }) {
            session.accessToken = token.accessToken
            return session
        },
        async jwt({ token, account }) {
            if (account) {
                token.accessToken = account.access_token
            }
            return token
        }
    },
    session: {
        // Use JSON Web Tokens for session instead of database sessions.
        // This option can be used with or without a database for users/accounts.
        // Note: `strategy` should be set to 'jwt' if no database is used.
        strategy: "jwt",
    },
    secret: process.env.SECRET,

})