"use client";
import { useState } from "react";
import Image from "next/image";
import styled from "styled-components";
import ActiveLink from "./ActiveLink";
import device from "../app/device";
import pageLinks from "../constants/links";

const Navbar = ({ toggleSidebar }) => {
	const [visible, setVisible] = useState(true);
	return (
		<Wrapper>
			<div className="bg-white dark:bg-slate-900 w-full h-24 flex items-center">
				<div className="nav-center  mx-auto">
					<div className="nav-header">
						<Image
							className="relative dark:drop-shadow-[0_0_0.3rem_#ffffff70] dark:invert"
							src="/logo.svg"
							alt="Enrique Montes Logo"
							width={250}
							height={50}
							priority
						/>
					</div>
					<div className="nav-links">
						{pageLinks.map((link) => {
							return (
								<ActiveLink key={link.id} href={link.url} text={link.text} />
							);
						})}
					</div>
				</div>
			</div>
		</Wrapper>
	);
};

export default Navbar;

const Wrapper = styled.div`
  .navbar {
    width: 100%;
    height: 5.8rem;
    display: flex;
    align-items: center;
    z-index: 200;
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

  @media screen and ${device.tablet} {
    .toggle-btn {
      display: none;
    }
    .nav-links {
      display: flex;
      justify-content: flex-end;
    }

    .nav-links a {
      text-transform: capitalize;
      font-weight: bold;
      font-size: 1.2rem;
      letter-spacing: var(--spacing);
      padding: 0.58rem 0;

      &:not(:last-child) {
        margin-right: 2.32rem;
      }
    }

    .nav-center {
      display: grid;
      grid-template-columns: auto 1fr;
      align-items: center;
    }
  }

  @media screen and ${device.tablet} {
    background: transparent;
  }
`;
