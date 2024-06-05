"use client";
import socialLinks from "@/constants/social_links";
import styled from "styled-components";
import Link from "next/link";
import Image from "next/image";

const Hero = (props) => {
	return (
		<Wrapper>
			<section className="section-center hero-center">
				<article className="hero-info">
					<div>
						<div className="underline" />
						<h1>{props.Header1}</h1>
						<h3>{props.Header3}</h3>
						<h4>{props.Header4}</h4>
						<Link href={props.LinkUrl} className="btn">
							{props.LinkText}
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
					{props.BackgroundImage.data && (
						<Image
							src={props.BackgroundImage.data.attributes.formats.medium.url}
							alt="Enrique Montes Programming Cave"
							fill
							style={{ objectFit: "cover" }}
							sizes="(max-width: 768px) 100vw, 50vw"
						/>
					)}
				</ImageWrapper>
			</section>
		</Wrapper>
	);
};

export default Hero;

const ImageWrapper = styled.div`
  display: none; // por defecto no se muestra

  @media (min-width: 1024px) {
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
  @media (min-width: 1440px) {
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

  @media (min-width: 1024px) {
    ::before {
      content: "";
      position: absolute;
      top: 0;
      left: 60%;
      right: 0;
      bottom: 0;
      background: #ffffff;
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
