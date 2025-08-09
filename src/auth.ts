// Dependencies.
import bcrypt from "bcryptjs";
import NextAuth from "next-auth";
import CredentialProvider from "next-auth/providers/credentials";

// Auth
import { MongoDBAdapter } from "@auth/mongodb-adapter";

// Schemas
import User from "./modules/user.schema";

// Lib
import clientPromise from "./lib/mongodb";
import dbConnect from "./lib/dbConnect";

const thirtyDaysInSeconds = 30 * 24 * 60 * 60;
const twentyFourHoursInSeconds = 24 * 60 * 60;

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: MongoDBAdapter(clientPromise),

  providers: [
    CredentialProvider({
      name: "Credentials",
      credentials: {
        email: { label: "Email", type: "text" },
        password: { label: "Password", type: "password" },
      },

      async authorize(credentials) {
        if (!credentials.email || !credentials.password) return null;

        await dbConnect();

        await User.db.asPromise();

        const user = await User.findOne({ email: credentials.email }).select(
          "+password"
        );

        if (!user || !user.password) return null;

        const isPasswordValid = await bcrypt.compare(
          credentials.password as string,
          user.password
        );

        if (!isPasswordValid) return null;

        return {
          id: user._id.toString(),
          name: user.name,
          email: user.email,
        };
      },
    }),
  ],

  session: {
    strategy: "jwt",
    maxAge: thirtyDaysInSeconds,
    updateAge: twentyFourHoursInSeconds,
  },

  pages: {
    signIn: "/auth/signin",
  },

  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
        token.email = user.email;
        token.firstName = user.firstName;
        token.lastName = user.lastName;
      }

      return token;
    },

    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
        session.user.email = token.email;
        session.user.firstName = token.firstName;
        session.user.lastName = token.lastName;
      }

      return session;
    },
  },

  secret: process.env.NEXTAUTH_SECRET,
});
