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

function Index() {
  return (
    <Wrapper onDragOver={(e) => e.preventDefault()} onDrop={(e) => e.preventDefault()}>
      <FileUploader />
    </Wrapper>
  );
}

export default Index;
