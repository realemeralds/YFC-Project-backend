import React from "react";
import { TileBackground, TileWrapper, TileContent, Tile } from "./tile";
import {
  ProblemBackground,
  ProblemContainer,
  WorkLeft,
  WorkRight,
} from "./problem";
import Image from "next/image";

const Problems = () => (
  <TileWrapper numOfPages={3}>
    <TileBackground>
      <ProblemBackground />
    </TileBackground>
    <TileContent>
      <Tile
        page={0}
        renderContent={({ progress }) => (
          <ProblemContainer>
            <WorkLeft progress={progress}>
              <p>We built</p>
            </WorkLeft>
            <WorkRight progress={progress}>
              <Image
                src="/placeholder.png"
                layout="responsive"
                width={600}
                height={600}
                alt="placeholder"
              />
            </WorkRight>
          </ProblemContainer>
        )}
      />
    </TileContent>
    <TileContent>
      <Tile
        page={1}
        renderContent={({ progress }) => (
          <ProblemContainer>
            <WorkLeft progress={progress}>
              <p>We built</p>
            </WorkLeft>
            <WorkRight progress={progress}>
              <Image
                src="/placeholder.png"
                layout="responsive"
                width={600}
                height={600}
                alt="placeholder"
              />
            </WorkRight>
          </ProblemContainer>
        )}
      />
    </TileContent>
    <TileContent>
      <Tile
        page={2}
        renderContent={({ progress }) => (
          <ProblemContainer>
            <WorkLeft progress={progress}>
              <p>We built</p>
            </WorkLeft>
            <WorkRight progress={progress}>
              <Image
                src="/placeholder.png"
                layout="responsive"
                width={600}
                height={600}
                alt="placeholder"
              />
            </WorkRight>
          </ProblemContainer>
        )}
        z
      />
    </TileContent>
  </TileWrapper>
);

export default Problems;
