
import { Brand, HeaderRightRender, Wrapper, SubBrand , GitHubLink } from "./styled";
import { useNavigate } from "react-router-dom";
import { useStream, useWallet } from "../../hooks";
import styled, { css } from "styled-components";
import Button from "../BaseComponents/Button";
import { useEffect, useState } from "react";
import React from "react"
import './GeneralStyling.css';
import './HelpMeDialog.css';



const Header = (): React.ReactElement => {
  const [connected, setConnected] = useState(false);

  const {
    pkh,
  } = useStream();
  const connect = async () => {
    const { wallet } = await connectWallet();
    const pkh = await createCapability(wallet);
    console.log("pkh:", pkh);
    setConnected(true);
    return pkh;
  };

  const { connectWallet } = useWallet();
  const navigate = useNavigate();
  const { createCapability } = useStream();

  const truncatePkh = (pkh: string | any[]) => {
    const prefixLength = 10;
    const suffixLength = 4;
  
    if (pkh.length <= prefixLength + suffixLength) {
      return pkh; // No need to truncate
    }
  
    const prefix = pkh.slice(0, prefixLength);
    const suffix = pkh.slice(-suffixLength);
  
    return `${prefix}...${suffix}`;
  };


  


  return (
    <Wrapper>
      <Brand
        onClick={() => {
          navigate("/");
        }}
      >
        Recipe OS
      </Brand>

      <SubBrand
        onClick={() => {
          navigate("/");
        }}
      >
        Explore
      </SubBrand>

      <SubBrand
        onClick={() => {
          navigate("/");
        }}
      >
        Create 
      </SubBrand>

      <HeaderRightRender>
    
      {connected ? (
          <div className="blackText">{truncatePkh(pkh)}</div>
        ) : (
          <div onClick={connect} className={`help shadow`} style={{ 'text-align': 'center', 'color': 'var(--support1)' }}>
            <span style={{ 'font-size': '1.5rem' }}> connect </span>
          </div>
        )}
     
      </HeaderRightRender>
    </Wrapper>
  );
};

export default Header;