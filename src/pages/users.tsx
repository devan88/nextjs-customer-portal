import Email from '@/components/email';
import Footer from '@/components/footer';
import Header from '@/components/header';
import { useAppDispatch, useAppSelector } from '@/store/store';
import { GetAllUsers } from '@/utils/api';
import { auth } from '@/utils/auth';
import { GetServerSidePropsContext, InferGetServerSidePropsType } from 'next';
import Image from 'next/image';
import { useEffect } from 'react';

const footerLinks = () => {
  return [
    {
      label: 'Privacy Policy',
      href: '#',
    },
    {
      label: 'Contact Us',
      href: '#',
    },
  ];
};

const headerLinks = () => {
  return [
    {
      label: 'Home',
      href: '/',
    },
    {
      label: 'User List',
      href: '/users',
    },
  ];
};

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await auth(context.req, context.res);
  return {
    props: { session: session },
  };
}

export default function UserList({
  session,
}: InferGetServerSidePropsType<typeof getServerSideProps>) {
  const usersState = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    GetAllUsers(dispatch);
  }, [dispatch]);

  return (
    <div className="h-screen">
      <Header session={session} links={headerLinks()}></Header>
      <div className="flex h-[90%] flex-col justify-center ">
        <div className="flex h-[20%] items-center justify-center">
          <h1 className="text-6xl">USER LIST</h1>
        </div>
        <div className="flex h-[80%] items-start justify-center space-x-20">
          {usersState.users.length > 0 &&
            usersState.users.map((user) => {
              return (
                <div key={user.id}>
                  <p>
                    <strong>
                      {user.firstName} {user.lastName}
                    </strong>
                  </p>
                  <Email id={user.id} maskedEmail={user.email}></Email>
                  <Image
                    src={user.avatar}
                    width={0}
                    height={0}
                    sizes="100vw"
                    alt=""
                    style={{ width: 'auto', height: 'auto' }}
                  />
                </div>
              );
            })}
        </div>
      </div>
      <Footer links={footerLinks()}></Footer>
    </div>
  );
}
