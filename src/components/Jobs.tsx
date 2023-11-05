"use client"
import { useState } from "react";
import Title from "./Title";
import { FaAngleDoubleRight } from "react-icons/fa";
import styled from "styled-components";
import Link from "next/link";

const Jobs = ({ jobs, showLink }) => {
  const [value, setValue] = useState(0);
  // const { company, position, date, desc } = jobs[value];

  return (
    <Wrapper className="section">
      <Title title="Experience" />
      <div className={showLink ? "jobs-center" : "jobs-center-all"}>
        {/* btn container */}
        <div className={showLink ? "btn-container" : "btn-container-all"}>
          {/* {jobs.map((item, index) => {
            return (
              <button
                key={index}
                className={
                  index === value ? "job-btn active-btn" : "job-btn small-font"
                }
                onClick={() => setValue(index)}
              >
                {item.company}
              </button>
            );
          })} */}
        </div>
        {/* job info */}
        <article className="job-info">
          {/* <h3>{position}</h3>
          <h4>{company}</h4>
          <p className="job-date">{date}</p> */}
          {/* {desc.map((item) => {
            return (
              <div key={item.id} className="job-desc">
                <FaAngleDoubleRight className="job-icon" />
                <p>{item.name}</p>
              </div>
            );
          })} */}
        </article>
      </div>
      {showLink && (
        <Link url="/about" className="btn center-btn">
          More info
        </Link>
      )}
    </Wrapper>
  );
};

export default Jobs;

const Wrapper = styled.section`
  .jobs-center {
    width: 80vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .jobs-center-all {
    width: 80vw;
    margin: 0 auto;
    max-width: var(--max-width);
  }
  .btn-container {
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    justify-content: center;
    margin-bottom: 4rem;
  }
  .btn-container-all {
    display: flex;

    flex-direction: row;
    flex-wrap: wrap;
    justify-content: flex-start;
    margin-bottom: 4rem;
  }
  .job-btn {
    background: transparent;
    border-color: transparent;

    text-transform: capitalize;
    font-size: 1.25rem;
    letter-spacing: var(--spacing);
    margin: 0.5rem;
    transition: var(--transition);
    cursor: pointer;

    line-height: 1;
    padding: 0.375rem 0.75rem;
    border-radius: var(--radius);
    box-shadow: var(--light-shadow);
  }
  .small-font {
    font-size: 0.8rem;
  }
  .job-btn:hover {
    color: var(--clr-primary-5);
    box-shadow: 0 2px var(--clr-primary-5);
  }
  .active-btn {
    color: var(--clr-primary-5);
    box-shadow: 0 2px var(--clr-primary-5);
  }
  .job-info {
    min-height: 320px;
  }
  .job-info h3 {
    font-weight: 400;
  }
  .job-info h4 {
    text-transform: uppercase;
    color: var(--clr-grey-5);
    background: var(--clr-grey-9);
    display: inline-block;
    padding: 0.375rem 0.75rem;
    border-radius: var(--radius);
  }
  .job-date {
    font-size: 0.75rem;
    letter-spacing: 1px;
  }
  .job-desc {
    display: grid;
    grid-template-columns: auto 1fr;
    column-gap: 2rem;
    align-items: center;
    margin-bottom: 1.25rem;
  }
  .job-desc p {
    margin-bottom: 0;
    color: var(--clr-grey-3);
  }
  .job-icon {
    color: var(--clr-primary-5);
  }
  @media screen and (min-width: 992px) {
    .jobs-center {
      width: 90vw;
      display: grid;
      grid-template-columns: 200px 1fr;
      column-gap: 4rem;
    }
    .btn-container {
      flex-direction: column;
      justify-content: flex-start;
    }

    .active-btn {
      box-shadow: -2px 0 var(--clr-primary-5);
    }
    .job-btn:hover {
      box-shadow: -2px 0 var(--clr-primary-5);
    }
    .job-date {
      font-size: 1rem;
      letter-spacing: var(--spacing);
    }
  }
`;
