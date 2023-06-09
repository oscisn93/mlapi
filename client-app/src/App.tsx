import UploadImage from "./components/uploadImage.jsx";
import styled from "styled-components";

// @ts-ignore
const Container = styled.div`
  font-family: "Titillium Web", sans-serif;
  width: 100%;
  min-height: 1000px;
  display: flex;
  flex-direction: column;
  align-items: center;
  background-color: #2a2a2a;
`;

// @ts-ignore
const Header = styled.header`
  width: 100%;
  display: block;
  padding: 1em;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

// @ts-ignore
const Title = styled.h1`
  display: block;
  font-size: 1.5em;
  color: #fff;
`;

// @ts-ignore
const Main = styled.main`
  width: 40%;
  display: flex;
  flex-direction: column;
  gap: 1em;
  justify-content: center;
  padding: 1em;
  align-items: center;
`;

// @ts-ignore
const Footer = styled.footer`
  width: 100%;
  padding: 1em;
  font-size: 0.6em;
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: auto;
  color: #fff;
`;

function App() {
  return (
    <Container>
      <Header>
        <Title>Can AI Guess Your Age??</Title>
      </Header>
      <Main>
        <UploadImage />
      </Main>
      <Footer>
        <p>
          {"Made with ❤️ by "}
          <a href="https://github.com/oscisn93"> Oscar Cisneros</a>
        </p>
      </Footer>
    </Container>
  );
}

export default App;
