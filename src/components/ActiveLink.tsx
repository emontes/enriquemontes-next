"use client";
import { usePathname } from "next/navigation";
import Link from "next/link";
import React from "react";

const style = { textDecoration: "underline" };

const ActiveLink = ({ text, href }) => {
  const asPath = usePathname();
  return (
    <Link href={href} className={asPath === href ? "border-b-2 border-sky-900 dark:border-sky-700" : "transition hover:-translate-y-1"}>
      {text}
    </Link>
  );
};

export default ActiveLink;
