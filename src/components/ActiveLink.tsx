"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const style = { textDecoration: "underline" };

const ActiveLink = ({ text, href }) => {
  const asPath = usePathname();
  return (
    <Link href={href} className={asPath === href ? "transition border-b-2" : "transition hover:-translate-y-1"}>
      {text}
    </Link>
  );
};

export default ActiveLink;
