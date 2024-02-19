import Link from 'next/link';

interface FooterLink {
  label: string;
  href: string;
}

function DisplayLinks({ links }: { links?: FooterLink[] }) {
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

export default function Footer({ links }: { links?: FooterLink[] }) {
  return (
    <footer className="flex h-[5%] flex-row items-center justify-center border-t p-4">
      <DisplayLinks links={links}></DisplayLinks>
      <div>
        <p>&copy; Zurich 2024</p>
      </div>
    </footer>
  );
}
