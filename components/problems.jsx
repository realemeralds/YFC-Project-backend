import React from "react";
import { TileWrapper, TileContent, Tile } from "./tile";
import {
  ProblemBackground,
  ProblemBackgroundContainer,
  ProblemContainer,
  ProblemLeft,
  ProblemRight,
  ChangingText,
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
              <p className="text-4xl font-medium px-8 w-full">
                Dyslexia is a neurological difficultly associated with procesing
                audio, making it{" "}
                <span className="text-4xl font-semibold underline decoration-2 underline-offset-2">
                  difficult to interpret
                </span>{" "}
                syllables as words.
              </p>
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
              <p className="text-4xl font-medium px-8 w-full">
                <span className="text-4xl font-semibold underline decoration-2 underline-offset-2">
                  Reading
                </span>
                {", "}
                <span className="text-4xl font-semibold underline decoration-2 underline-offset-2">
                  Spelling
                </span>
                {" and "}
                <span className="text-4xl font-semibold underline decoration-2 underline-offset-2">
                  Writing
                </span>
                {", "}are tall tasks for any dyslexic, thanks to difficulties in
                recognition.
              </p>
            </ProblemLeft>
            <ProblemRight progress={progress}>
              <div className="space-y-6">
                <ChangingText />
              </div>
            </ProblemRight>
          </ProblemContainer>
        )}
      />
      <Tile
        page={2}
        renderContent={({ progress }) => (
          <ProblemContainer>
            <ProblemLeft progress={progress}>
              <p className="text-4xl font-medium px-8 w-full">
                <span className="text-4xl font-semibold underline decoration-2 underline-offset-2">
                  On top of this,
                </span>{" "}
                dyslexics have to deal with common misunderstandings of their
                condition.
              </p>
            </ProblemLeft>
            <ProblemRight progress={progress}>
              <div
                style={{
                  width: "100%",
                  height: "80vh",
                  position: "relative",
                  display: "flex",
                }}
              >
                <Image
                  src="/misunderstandings.png"
                  alt="misunderstandings of dyslexics"
                  layout="fill"
                  objectFit="contain"
                />
              </div>
            </ProblemRight>
          </ProblemContainer>
        )}
      />
    </TileContent>
  </TileWrapper>
);

export default Problems;
