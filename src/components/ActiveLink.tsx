"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";

const style = { textDecoration: "underline" };

const ActiveLink = ({ text, href }) => {
  const asPath = usePathname();
  return (
    <Link href={href} className={asPath === href ? "border-b-2 border-sky-900 text-blue-700 dark:text-blue-400 dark:border-sky-700 " : "transition text-gray-700 dark:text-gray-300 hover:text-blue-700 dark:hover:text-blue-400"}>
      {text}
    </Link>
  );
};

export default ActiveLink;
