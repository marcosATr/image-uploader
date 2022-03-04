import { useEffect, useState } from "react";
import { useRef } from "react";
import styled from "styled-components";

const Box = styled.div`
  background-color: #ffffff;
  width: 402px;
  height: 469px;
  font-family: "Poppins", sans-serif;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  border-radius: 12px;
  display: flex;
  flex-direction: column;
  align-items: center;
  input {
    display: none;
  }
`;

const Header = styled.div`
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 27px;
  letter-spacing: -0.035em;
  color: #4f4f4f;
  padding-top: 32px;
`;

const Instructions = styled.div`
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 15px;
  text-align: center;
  padding-top: 32px;
  color: #828282;
`;

const Drop = styled.div`
  background: #f6f8fb;
  border: 1px dashed #97bef4;
  border-radius: 12px;
  height: 219px;
  width: 338px;
  margin: 30px 32px 16px;
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  & > * {
    padding: 10px;
  }
`;

const DropText = styled.div`
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 18px;
  letter-spacing: -0.035em;
  color: ${(props) => {
    if (props.message) {
      return props.message === "Or" ? "#bdbdbd" : "red";
    } else {
      return "#bdbdbd";
    }
  }};
`;

const Button = styled.div`
  background: #2f80ed;
  border-radius: 8px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 12px;
  line-height: 16px;
  text-align: center;
  letter-spacing: -0.035em;
  color: #ffffff;
  padding: 8px 16px;
  margin-top: 16px;
  cursor: pointer;
`;

function FileUploader() {
  const uploadInput = useRef();
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState("Or");
  const [success, setSuccess] = useState(false)

  useEffect(() => {
    if (message !== "Or") {
      console.log("Message changed");
      const fiveSeconds = setTimeout(() => {
        setMessage("Or");
      }, 5000);

      return () => {
        clearTimeout(fiveSeconds);
      };
    }
  }, [message]);

  const loadClick = () => {
    uploadInput.current.click();
  };

  const handleInput = (e) => {
    const selected = e.dataTransfer?.files[0] || e.target.files[0];
    e.preventDefault();
    if (selected.size > 3000000) {
      setMessage("Only file smaller than 5MB, please!");
      return;
    }
    if (selected.type !== "image/jpeg" && selected.type !== "image/jpg" && selected.type !== "image/png") {
      setMessage("Only jpg and png files, please!");
      return;
    }
    setFile(selected);
  };

  const handleUpload = async () => {
    const url = "http://localhost:3333/photos/upload";
    const formData = new FormData();
    formData.append("file", file);

    const response = await fetch(url, {
      method: "POST",
      body: formData,
    }).catch((err) => alert("File Upload Error"));

    if (response.status === 201) {
      setMessage("Sucess!");
    }
  };
  return (
    <Box
      onDrop={() => {
        return false;
      }}
    >
      <Header>Upload your image</Header>
      <Instructions>File should be Jpeg or Png... </Instructions>
      <Drop
        onDragOver={(e) => e.preventDefault()}
        onDrop={(e) => {
          handleInput(e);
        }}
      >
        <img src="/image.svg" alt="file upload" />
        <DropText>Drag and Drop images here</DropText>
      </Drop>
      {file ? <DropText>{file.name}</DropText> : <DropText message={message}>{message}</DropText>}
      {file ? <Button onClick={handleUpload}>Upload</Button> : <Button onClick={loadClick}>Choose a file</Button>}
      <input type="file" name="filename" ref={uploadInput} onChange={(e) => handleInput(e)} accept="image/png, image/jpeg" />
    </Box>
  );
}

export default FileUploader;
