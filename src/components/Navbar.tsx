"use client";
import styled from "styled-components";
import ActiveLink from "./ActiveLink";

const Navbar = () => {
  return (    
    <Wrapper className="fixed left-0 top-0 flex justify-center w-full">
      <div className=" w-11/12 h-20 flex items-center justify-between text-xl">
        <ActiveLink href="/" text="Home" />
        <ActiveLink href="/about" text="About" />
        <ActiveLink href="/resources" text="Resources" />
        <ActiveLink href="/developments" text="Developments" />
        <ActiveLink href="/contact" text="Contact" />
      </div>
    </Wrapper>
  );
};

export default Navbar;

const Wrapper = styled.div`
  .navbar {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 5.8rem;
    display: flex;
    align-items: center;
    z-index: 200;
    background: var(--clr-white);
  }

  .navbar-fixed {
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 5.6rem;
    display: flex;
    align-items: center;
    z-index: 200;
    background: var(--clr-white);
    transition: var(--transition);
    border-bottom: 0.116rem solid var(--clr-primary-5);

    box-shadow: var(--dark-shadow);
  }

  .nav-center {
    width: 90vw;
    max-width: 117rem;
    margin: 0 auto;
  }
  .nav-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }
  .nav-header img {
    margin-bottom: 0.475rem;
  }
  .toggle-btn {
    font-size: 2.32rem;
    background: transparent;
    border-color: transparent;
    color: var(--clr-primary-5);
    cursor: pointer;
    transition: var(--transition);
  }
  .toggle-btn:hover {
    color: var(--clr-primary-2);
  }
  .nav-links {
    display: none;
  }
`;
