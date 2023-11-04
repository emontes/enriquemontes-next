"use client";
import socialLinks from "../app/constants/social_links"
import styled from "styled-components";
import device from "../app/device";
import Link from "next/link";
import Image from "next/image";

const Hero = () => {
  return (
    <Wrapper>
      <section className="section-center hero-center">
        <article className="hero-info">
          <div>
            <div className="underline"></div>
            <h1>I'm Enrique</h1>
            <h3>Programmer in Cancun</h3>
            <h4>Next.js / Gatsby.js / Strapi</h4>
            <Link href="/contact" className="btn">
              contact me
            </Link>
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
        </article>

        <ImageWrapper>
          <Image
            src="/images/mainBcg.jpg"
            alt="Enrique Montes Programming Cave"
            layout="fill"
            objectFit="cover"
          />
        </ImageWrapper>
      </section>
    </Wrapper>
  );
};

export default Hero;

const ImageWrapper = styled.div`
  display: none; // por defecto no se muestra

  @media ${device.laptop} {
    display: block; // en pantallas de tamaño laptop o superior se muestra
    grid-row: 1/1;
    grid-column: 7 / -1;
    border-radius: 2rem;
    transform: skewY(1.5deg);
    overflow: hidden; // para asegurarse de que el borde redondeado se aplique a la imagen también
    position: relative;
    height: 65%; // este valor puede ser diferente dependiendo del estilo que necesites

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: linear-gradient(to bottom right, var(--clr-primary-5), #222);
      opacity: 0.75;
      transition: var(--transition);
    }

    &:hover::after {
      opacity: 0.3;
    }
  }
`;


const Wrapper = styled.header`
  /* margin-top: -5rem; */
  /* padding-top: 5rem; */
  height: 89vh;
  background: var(--clr-primary-10);
  position: relative;
  -webkit-clip-path: polygon(0 0, 100% 0, 100% 75vh, 0 100%);
  clip-path: polygon(0 0, 100% 0, 100% 75vh, 0 100%);
  @media ${device.laptopL} {
    -webkit-clip-path: polygon(0 0, 100% 0, 100% 80vh, 0 100%);
    clip-path: polygon(0 0, 100% 0, 100% 80vh, 0 100%);
  }

  .hero-center {
    height: 100%;
    display: grid;
    align-items: center;
  }

  .underline {
    margin-bottom: 0.5rem;
    margin-left: 0;
  }
  .hero-info {
    background: var(--clr-primary-10);
  }

  .hero-info h4 {
    color: var(--clr-grey-5);
  }
  .hero-icons {
    justify-items: flex-start;
  }
  .btn {
    margin-top: 1.25rem;
  }

  @media ${device.laptop} {
    ::before {
      content: "";
      position: absolute;
      top: 0;
      left: 60%;
      right: 0;
      bottom: 0;
      background: var(--clr-white);
    }

    .hero-center {
      grid-template-columns: repeat(12, 1fr);
    }

    .hero-info {
      grid-row: 1/1;
      grid-column: 1 / span 8;
    }

  }
`;
