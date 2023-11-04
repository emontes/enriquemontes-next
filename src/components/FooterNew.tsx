import React from "react";
import socialLinks from "../app/constants/social_links"
import styled from "styled-components";
import { StaticImage } from "gatsby-plugin-image";
import device from "../assets/themes/device";
import links from "../constants/links-footer";

const Footer = () => {
  return (
    <Wrapper>
      <div className="logo-box">
        <StaticImage
          src="../assets/images/logo-eama.png"
          alt="Enrique Adelino Montes Araujo"
          className="logo"
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
          <ul class="footer__list">
            {links.map((item) => {
              return (
                <li class="footer__item" key={item.link}>
                  <Link to={item.url} className="link">
                    <Trans>{item.text}</Trans>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>

        <div className="copy">
          <div className="underline" />
          <p>
            <Trans>copyright</Trans> &copy; {new Date().getFullYear()}{" "}
            <span>Enrique Adelino Montes Araujo</span>{" "}
            <Trans>all rights reserved</Trans>
          </p>
        </div>
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
    :hover {
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

    :hover {
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
