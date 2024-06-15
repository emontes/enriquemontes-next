"use client";
import { useState } from "react";
import TitleDisplay from "../Title";
import { FaAngleDoubleRight } from "react-icons/fa";
import Link from "next/link";
import type { JobsProps } from "@/app/dynamicRendering/types";

const Jobs = ({ Title, ShowLink, LinkText, Job }: JobsProps) => {
  const [value, setValue] = useState(0);
  if (!Job) {
    return null;
  }

  return (
    <section className="section bg-white">
      <TitleDisplay title={Title} />
      <div className={`w-4/5 mx-auto max-w-[var(--max-width)] ${ShowLink ? "grid grid-cols-1 md:grid-cols-[200px_1fr] gap-16" : ""}`}>
        <div className={`flex ${ShowLink ? "flex-col justify-start" : "flex-row flex-wrap justify-center"} mb-16`}>
          {Job.map((item, index) => (
            <button
              key={index}
              className={`bg-transparent border-none capitalize text-lg tracking-wide my-2 mx-2 transition-all cursor-pointer ${index === value ? "text-primary-5 shadow-[0_2px_#2892d7]" : "text-sm"} p-1.5 rounded-lg shadow-md hover:text-primary-5 hover:shadow-[0_2px_#2892d7] $
              {ShowLink ? "hover:shadow-[-2px_0_#6366F1]" : ""}`}
              onClick={() => setValue(index)}
            >
              {item.company}
            </button>
          ))}
        </div>
        <article className="min-h-[320px]">
          {Job.length > 0 && value >= 0 && value < Job.length && (
            <>
              <h3 className="font-normal">{Job[value].position}</h3>
              <h4 className="uppercase text-grey-5 bg-grey-9 inline-block py-1.5 px-3 rounded-lg">{Job[value].company}</h4>
              <p className="text-sm text-grey-8 tracking-wider">{Job[value].date}</p>
              {Job[value].desc.map((item) => (
                <div key={item.id} className="grid grid-cols-[auto_1fr] gap-8 items-center mb-5">
                  <FaAngleDoubleRight className="text-primary-5" />
                  <p className="mb-0 text-grey-5">{item.name}</p>
                </div>
              ))}
            </>
          )}
        </article>
      </div>
      {ShowLink && (
        <Link href="/about" className="btn center-btn">
          {LinkText}
        </Link>
      )}
    </section>
  );
};

export default Jobs;
