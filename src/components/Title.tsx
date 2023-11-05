import styled from "styled-components";

const Title = ({ title }) => {
  return (
    <Wrapper>
      <h2>{title || "Default Title"}</h2>
      <div className="underline"></div>
    </Wrapper>
  );
};

export default Title;

const Wrapper = styled.div`
  margin-bottom: 4rem;
  text-align: center;
  animation: moveInRight 1s ease-out;
  background-image: linear-gradient(
    to right,
    var(--clr-primary-7),
    var(--clr-primary-1)
  );
  color: transparent;
  -webkit-background-clip: text;
  letter-spacing: 0.2rem;
  transition: all 0.2s;
  &:hover {
    transform: skewY(-2deg) skewX(5deg) scale(1.1);
    text-shadow: 0.5rem 1rem 2rem rgba(0, 37, 92, 0.2);
  }
`;
