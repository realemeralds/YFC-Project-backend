import React from "react";
import { TileWrapper, TileContent, Tile } from "./tile";
import {
  ProblemBackground,
  ProblemBackgroundContainer,
  ProblemContainer,
  ProblemLeft,
  ProblemRight,
} from "./problem";
import Image from "next/image";

const Problems = () => (
  <TileWrapper numOfPages={3}>
    <ProblemBackgroundContainer>
      <ProblemBackground />
    </ProblemBackgroundContainer>
    <TileContent>
      <Tile
        page={0}
        renderContent={({ progress }) => (
          <ProblemContainer>
            <ProblemLeft progress={progress}>
              <p>We built</p>
            </ProblemLeft>
            <ProblemRight progress={progress}>
              <Image
                src="/placeholder.png"
                layout="responsive"
                width={600}
                height={600}
                alt="placeholder"
              />
            </ProblemRight>
          </ProblemContainer>
        )}
      />
      <Tile
        page={1}
        renderContent={({ progress }) => (
          <ProblemContainer>
            <ProblemLeft progress={progress}>
              <p>We built</p>
            </ProblemLeft>
            <ProblemRight progress={progress}>
              <Image
                src="/placeholder.png"
                layout="responsive"
                width={600}
                height={600}
                alt="placeholder"
              />
            </ProblemRight>
          </ProblemContainer>
        )}
      />
      <Tile
        page={2}
        renderContent={({ progress }) => (
          <ProblemContainer>
            <ProblemLeft progress={progress}>
              <p>We built</p>
            </ProblemLeft>
            <ProblemRight progress={progress}>
              <Image
                src="/placeholder.png"
                layout="responsive"
                width={600}
                height={600}
                alt="placeholder"
              />
            </ProblemRight>
          </ProblemContainer>
        )}
      />
    </TileContent>
  </TileWrapper>
);

export default Problems;
