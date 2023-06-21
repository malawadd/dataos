import React, { useState } from "react";
import { LivepeerConfig, Player, ReactClient } from "@livepeer/react";

interface IProps {
  reactClient: ReactClient;
  playbackId: string;
}

export const LivepeerPlayer = ({ reactClient, playbackId }: IProps) => {
  console.log("playId:", playbackId);
  console.log("reactClient:", reactClient);

  return (
    <Player
      title="Waterfalls"
      playbackId={playbackId}
      showPipButton
      showTitle={false}
      aspectRatio="16to9"
      controls={{
        autohide: 3000,
      }}
      theme={{
        borderStyles: { containerBorderStyle: undefined },
        radii: { containerBorderRadius: "10px" },
      }}
    />
  );
};
