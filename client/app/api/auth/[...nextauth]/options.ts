import { DB_NAME, GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } from "@/utils/env";
import { dbClientPromise } from "@/utils/mongo";
import { MongoDBAdapter } from "@auth/mongodb-adapter";
import type { NextAuthOptions } from "next-auth";
import GoogleProvider, { GoogleProfile } from "next-auth/providers/google";

export const options: NextAuthOptions = {
  providers: [
    GoogleProvider({
      profile(profile: GoogleProfile) {
        return {
          id: profile.sub,
          name: profile.name,
          email: profile.email,
          image: profile.picture,
          bookmarks: [],
          is_admin: false,
          followers: [],
          following: [],
        };
      },
      clientId: GOOGLE_CLIENT_ID,
      clientSecret: GOOGLE_CLIENT_SECRET,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  pages: {
    signIn: "/auth/signin",
  },
  adapter: MongoDBAdapter(dbClientPromise, {
    databaseName: DB_NAME,
  }),
};
