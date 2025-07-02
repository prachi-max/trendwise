
'use client';

import { signIn, signOut, useSession } from 'next-auth/react';

export default function LoginPage() {
  const { data: session, status } = useSession();

  if (status === 'loading') {
    return <p>Loading...</p>; // prevents error while session is being fetched
  }

  return (
    <div>
      {session ? (
        <>
          <p>Welcome, {session.user?.name}</p>
          <button onClick={() => signOut()}>Sign out</button>
        </>
      ) : (
        <button onClick={() => signIn('google')}>Sign in with Google</button>
      )}
    </div>
  );
}
