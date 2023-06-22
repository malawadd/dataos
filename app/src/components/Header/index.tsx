
import { Brand, HeaderRightRender, Wrapper, GitHubLink } from "./styled";
import { useNavigate } from "react-router-dom";
import { useStream, useWallet } from "../../hooks";
import styled, { css } from "styled-components";
import Button from "../BaseComponents/Button";
import { useEffect } from "react";
import React from "react"


const Header = (): React.ReactElement => {
  const connect = async () => {
    const { wallet } = await connectWallet();
    const pkh = await createCapability(wallet);
    console.log("pkh:", pkh);
    return pkh;
  };

  const { connectWallet } = useWallet();
  const navigate = useNavigate();
  const { createCapability } = useStream();


  return (
    <Wrapper>
      <Brand
        onClick={() => {
          navigate("/");
        }}
      >
        Recipe OS
      </Brand>

      <HeaderRightRender>
      {/* <Button
          type="primary"
          onClick={connect}
          css={css`
            min-width: 150px;
          `}
        
        >
           { "connected"}
        </Button> */}
      <button onClick={connect}>connect</button>
      </HeaderRightRender>
    </Wrapper>
  );
};

export default Header;