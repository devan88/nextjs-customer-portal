import { auth } from '@/utils/auth';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import { signIn, signOut } from 'next-auth/react';
import { Inter } from 'next/font/google';
import Image from 'next/image';

const inter = Inter({ subsets: ['latin'] });

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await auth(context.req, context.res);
  return {
    props: { session: session },
  };
}

export default function Home({ session }: InferGetServerSidePropsType<typeof getServerSideProps>) {
  return (
    <main
      className={`flex min-h-screen flex-col items-center justify-center p-24 ${inter.className}`}
    >
      <Image
        className="mb-12"
        src="/zurich-logo.svg"
        alt="Zurich Logo"
        width={180}
        height={37}
        priority
      />
      <h1 className="mb-12">Welcome To Zurich Customer Portal</h1>
      {!session && (
        <div>
          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={(e) => {
              e.preventDefault();
              signIn(undefined, {
                callbackUrl: '/users',
              });
            }}
          >
            Sign In
          </button>
        </div>
      )}
      {session && (
        <div className="flex flex-col items-center">
          <p>Logged In as {session.user?.name}</p>
          <button
            className="rounded bg-blue-500 px-4 py-2 font-bold text-white hover:bg-blue-700"
            onClick={(e) => {
              e.preventDefault();
              signOut();
            }}
          >
            Sign Out
          </button>
        </div>
      )}
    </main>
  );
}
