import { signIn } from 'next-auth/react';

export default function AccessDenied() {
  return (
    <div className="grid h-screen grid-cols-1 content-center justify-center gap-4 text-center">
      <div>
        <h1>Access Denied</h1>
      </div>
      <div>
        <h1>You must be signed in to view this page</h1>
      </div>
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
    </div>
  );
}
