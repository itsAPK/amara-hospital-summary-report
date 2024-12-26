/* eslint-disable @typescript-eslint/no-explicit-any */
import { type DefaultSession, type NextAuthConfig } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

/**
 * Module augmentation for `next-auth` types. Allows us to add custom properties to the `session`
 * object and keep type safety.
 *
 * @see https://next-auth.js.org/getting-started/typescript#module-augmentation
 */
declare module "next-auth" {
  interface Session extends DefaultSession {
    user: {
      id: string;
      // ...other properties
      // role: UserRole;
    } & DefaultSession["user"];
  }

  // interface User {
  //   // ...other properties
  //   // role: UserRole;
  // }
}

/**
 * Options for NextAuth.js used to configure adapters, providers, callbacks, etc.
 *
 * @see https://next-auth.js.org/configuration/options
 */
export const authConfig = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        username: { label: "username", type: "text" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) : Promise<any> {
        if(credentials.username==="admin" && credentials.password==="admin"){
          return {
            id: 'admin',
            name: 'admin',
          };
          }
      }
    })
  ],
  session: {
    strategy: "jwt",
    maxAge: 30 * 24 * 60 * 60, //30 Days
  },
  callbacks: {
    session: ({ session, user }) => ({
      ...session,
      user: {
        ...session.user,
        id: 'admin',
      },
    }),
  },
} satisfies NextAuthConfig;
