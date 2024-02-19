import type { GetServerSidePropsContext, NextApiRequest, NextApiResponse } from 'next';
import type { NextAuthOptions } from 'next-auth';
import { getServerSession } from 'next-auth';
import GoogleProvider from 'next-auth/providers/google';

const JWT_TOKEN_MAX_AGE = 86400; // 1 day
export const authConfig = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENTID ?? '',
      clientSecret: process.env.GOOGLE_CLIENTSECRET ?? '',
    }),
  ],
  session: {
    strategy: 'jwt',
    maxAge: JWT_TOKEN_MAX_AGE,
  },
} satisfies NextAuthOptions;

// Use it in server contexts
export function auth(
  ...args:
    | [GetServerSidePropsContext['req'], GetServerSidePropsContext['res']]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authConfig);
}
