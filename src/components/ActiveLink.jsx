"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const style = { textDecoration: "underline" };

const ActiveLink = ({ text, href }) => {
  const asPath = usePathname();
  return (
    <Link className="" href={href} style={asPath === href ? style : null}>
      {text}
    </Link>
  );
};

export default ActiveLink;
