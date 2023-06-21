import { WALLET, Mode, SignMethod } from "@dataverse/runtime-connector";
import { useState } from "react";
import { useConfig } from "../context/configContext";
import { useUser } from "../context/userContext";

export function useWallet() {
  const { runtimeConnector } = useConfig();
  const { userInfo, updateUserInfo } = useUser();

  const connectWallet = async () => {
    const { wallet, address, chain } = await runtimeConnector.connectWallet();
    updateUserInfo({ address, wallet });
    console.log("Connect res:", { address, wallet });
    return {
      address,
      wallet,
    };
  };

  const switchNetwork = async (chainId: number) => {
    const res = await runtimeConnector.switchNetwork(chainId);
    return res;
  };

  const sign = async (params: { method: SignMethod; params: any[] }) => {
    const res = await runtimeConnector.sign(params);
    return res;
  };

  const contractCall = async (params: {
    contractAddress: string;
    abi: any[];
    method: string;
    params: any[];
    mode?: Mode | undefined;
  }) => {
    const res = await runtimeConnector.contractCall(params);
    return res;
  };

  const ethereumRequest = async (params: { method: string; params?: any }) => {
    const res = await runtimeConnector.ethereumRequest(params);
    return res;
  };

  const getPKP = async () => {
    const res = await runtimeConnector.getPKP();
    return res;
  };

  const executeLitAction = async (params: {
    code: string;
    jsParams: object;
  }) => {
    const res = await runtimeConnector.executeLitAction(params);
    return res;
  };

  return {
    wallet: userInfo.wallet,
    address: userInfo.address,
    connectWallet,
    switchNetwork,
    sign,
    contractCall,
    ethereumRequest,
    getPKP,
    executeLitAction,
  };
}
