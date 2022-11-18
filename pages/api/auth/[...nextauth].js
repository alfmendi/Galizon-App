// --------------------------------------------------------------------------------
// - Permite establecer los diferentes tipos de proveedores del servicio de login -
// - En este caso particular, utilizo Google, pero se pueden definir más          -
// - como por ejemplo Facebook, Github, etc...                                    -
// --------------------------------------------------------------------------------

import NextAuth from "next-auth";
// import GithubProvider from "next-auth/providers/github"
import GoogleProvider from "next-auth/providers/google";
export default NextAuth({
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
    }),
    // ...add more providers here
  ],
  secret: process.env.NEXT_PUBLIC_SECRET,
});
