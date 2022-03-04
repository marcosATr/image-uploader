import styled from "styled-components";
import FileUploader from "../components/FileUploader.js";

const Wrapper = styled.div`
  width: 100%;
  height: 100vh;
  background-color: #fafafb;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const Box = styled.div`
  background-color: #ffffff;
  width: 402px;
  min-height: 469px;
  font-family: "Poppins", sans-serif;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 2rem 1rem;
  input {
    display: none;
  }
`;

function Index() {
  return (
    <Wrapper onDragOver={(e) => e.preventDefault()} onDrop={(e) => e.preventDefault()}>
      <Box
        onDrop={() => {
          return false;
        }}
      >
        <FileUploader />
      </Box>
    </Wrapper>
  );
}

export default Index;
