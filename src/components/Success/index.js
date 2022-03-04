import React, { useState } from "react";
import styled from "styled-components";
import { HiCheckCircle } from "react-icons/hi";
import { Button, Header } from "../FileUploader.js";

const LinkBox = styled.div`
  background: #f6f8fb;
  border: 1px solid #e0e0e0;
  border-radius: 8px;
  font-family: Poppins;
  font-style: normal;
  font-weight: 500;
  font-size: 10px;
  line-height: 12px;
  text-align: center;
  letter-spacing: -0.035em;
  color: #4f4f4f;
  width: 338px;
  height: 34px;
  margin-top: 32px;
  display: flex;
  align-items: center;
  padding-left: 16px;
  justify-content: space-between;
  div {
    margin-top: 0;
    max-height: 90%;
    margin-right: 1px;
  }
`;
const Icon = styled.div`
  color: green;
  font-size: 3rem;
`;

const UploadedImage = styled.div`
  max-width: 338px;
  height: 224.4px;
  margin-top: 32px;
  img {
    border-radius: 12px;
    height: 100%;
    max-width: 100%;
  }
`;

function Success({ newFileName }) {
  const [copied, setCopied] = useState("Copy");
  return (
    <>
      <Icon>
        <HiCheckCircle />
      </Icon>
      <Header>Uploaded Successfully</Header>
      <UploadedImage>
        <img src={process.env.REACT_APP_REMOTE + '/' + newFileName} alt="uploaded success" />
      </UploadedImage>
      <LinkBox>
        {process.env.REACT_APP_REMOTE + '/' + newFileName}
        <Button
          onClick={() => {
            setCopied("Copied!");
            navigator.clipboard.writeText(process.env.REACT_APP_REMOTE + '/' + newFileName);
          }}
        >
          {copied}
        </Button>
      </LinkBox>
    </>
  );
}

export default Success;
