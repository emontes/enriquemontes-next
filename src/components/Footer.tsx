import socialLinks from "@/app/constants/social_links";
import styled from "styled-components";
import Image from "next/image";
import device from "@/app/device";
import links from "@/app/constants/links-footer";
import Link from "next/link";

const Footer = () => {
  return (
    <Wrapper>
      <div className="logo-box">
        <Image
          src="/images/logo-eama.png"
          alt="Enrique Adelino Montes Araujo (EAMA)"
          className="logo"
          width={110}
          height={110}
        />

        <div className="social-links">
          {socialLinks.map((link) => {
            return (
              <a href={link.url} key={link.id} className="social-link">
                {link.icon}
              </a>
            );
          })}
        </div>
      </div>
      <div className="footer-bottom">
        <div className="navigation">
          <div className="underline" />
          <ul className="footer__list">
            {links.map((item) => {
              return (
                <li className="footer__item" key={item.link}>
                  <Link href={item.url} className="link">
                    {item.text}
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="copy">
          <div className="underline" />
          <p className="capitalize">
            copyright &copy; {new Date().getFullYear()}{" "}
            <span>Enrique Adelino Montes Araujo</span> all rights reserved
          </p>
        </div>
      </div>
      <div className="mt-4 flex items-center justify-center text-xl">
        Site made with: 
      <Image
          className="relative ml-3 invert dark:invert-0 drop-shadow-[0_0_0.3rem_#ffffff70]"
          src="/next.svg"
          alt="Next.js Logo"
          width={80}
          height={37}
        />
      </div>
    </Wrapper>
  );
};

export default Footer;

const Wrapper = styled.footer`
  color: var(--clr-grey-10);
  background-color: var(--clr-grey-1);
  padding: 5rem 0;

  .logo-box {
    margin-bottom: 4rem;
    display: flex;
    flex-direction: column;
    align-items: center;
  }
  .logo {
    width: 8rem;
    height: auto;
  }

  .social-links {
    margin-top: 2rem;
  }
  .social-link {
    color: var(--clr-primary-7);
    &:hover {
      color: var(--clr-grey-9);
    }
  }

  .footer-bottom {
    display: flex;
    flex-direction: column;

    @media ${device.tablet} {
      flex-direction: row;

      gap: 20%;
      > * {
        flex: 1;
      }
    }
  }

  .navigation {
    padding: 1rem;
    display: inline-block;
    text-align: center;
  }

  .footer__item {
    display: inline-block;

    &:not(:last-child) {
      margin-right: 1.5rem;
    }
  }

  .link {
    color: var(--clr-grey-10);
    background-color: var(--clr-grey-1);
    text-decoration: none;
    text-transform: uppercase;
    display: inline-block;
    transition: all 0.2s;

    &:hover {
      color: var(--clr-primary-5);
      transform: rotate(-5deg) scale(1.3);
    }
  }

  .copy {
    margin: auto;
    padding: 1rem;
  }

  p {
    color: var(--clr-grey-10);
  }

  span {
    color: var(--clr-primary-5);
  }
`;
