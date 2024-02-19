import { Session } from 'next-auth';
import { signOut } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { Tooltip } from 'react-tooltip';

interface HeaderLink {
  label: string;
  href: string;
}

function DisplayLinks({ links }: { links?: HeaderLink[] }) {
  if (!links?.length) {
    return <></>;
  } else {
    return links.map((link, index) => {
      return (
        <Link className="mr-8" key={index} href={link.href}>
          {link.label}
        </Link>
      );
    });
  }
}

export default function Header({
  session,
  links,
}: {
  session: Session | null;
  links?: HeaderLink[];
}) {
  return (
    <header className="flex h-[5%] items-center border-b p-4">
      <div className="flex w-[99%] justify-end">
        <DisplayLinks links={links}></DisplayLinks>
      </div>
      <nav className="flex items-center justify-end gap-4">
        <Tooltip id="profile" />
        <button
          data-tooltip-id="profile"
          data-tooltip-content="Sign Out"
          onClick={() => signOut({ callbackUrl: '/' })}
        >
          <Image
            className="h-6 w-6 rounded-full"
            src={session?.user?.image ?? '/next.svg'}
            width={0}
            height={0}
            alt=""
          />
        </button>
      </nav>
    </header>
  );
}
