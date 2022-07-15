import React from "react";
import { TileWrapper, TileContent, Tile } from "./tile";
import {
  ProblemBackground,
  ProblemBackgroundContainer,
  ProblemContainer,
  ProblemLeft,
  ProblemRight,
} from "./problem";
import ChangingText from "./ChangingText";
import Image from "next/future/image";

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
              <p className="project:text-4xl twoxsm:text-3xl text-2xl font-medium px-8 w-full">
                Dyslexia is a neurological difficultly associated with procesing
                audio, making it{" "}
                <span className="project:text-4xl twoxsm:text-3xl text-2xl font-semibold underline decoration-2 underline-offset-2">
                  difficult to interpret
                </span>{" "}
                syllables as words.
              </p>
            </ProblemLeft>
            <ProblemRight progress={progress}>
              <div
                style={{
                  width: "100%",
                  height: "80vh",
                  position: "relative",
                  display: "flex",
                  pointerEvents: "none",
                  justifyContent: "center",
                  alignItems: "center",
                }}
              >
                <Image
                  src="/panel1.png"
                  alt="Embrace dysxleia poster"
                  className="pointer-events-none z-10 object-center object-contain"
                />
              </div>
            </ProblemRight>
          </ProblemContainer>
        )}
      />
      <Tile
        page={1}
        renderContent={({ progress }) => (
          <ProblemContainer>
            <ProblemLeft progress={progress}>
              <p className="project:text-4xl twoxsm:text-3xl text-2xl font-medium px-8 w-full">
                <span className="project:text-4xl twoxsm:text-3xl text-2xl font-semibold underline decoration-2 underline-offset-2">
                  Reading
                </span>
                {", "}
                <span className="project:text-4xl twoxsm:text-3xl text-2xl font-semibold underline decoration-2 underline-offset-2">
                  Spelling
                </span>
                {" and "}
                <span className="project:text-4xl twoxsm:text-3xl text-2xl font-semibold underline decoration-2 underline-offset-2">
                  Writing
                </span>
                {", "}are tall tasks for any dyslexic, thanks to difficulties in
                recognition.
              </p>
            </ProblemLeft>
            <ProblemRight progress={progress}>
              <div className="space-y-6">
                <ChangingText progress={progress} />
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
              <p className="project:text-4xl twoxsm:text-3xl text-2xl font-medium px-8 w-full">
                <span className="project:text-4xl twoxsm:text-3xl text-2xl font-semibold underline decoration-2 underline-offset-2">
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
                  pointerEvents: "none",
                  justifyContent: "center",
                }}
              >
                <Image
                  src="/misunderstandings.png"
                  alt="misunderstandings of dyslexics"
                  className="pointer-events-none z-10 object-center object-contain"
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
