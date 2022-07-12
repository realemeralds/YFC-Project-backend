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
              <p className="text-4xl font-medium px-8 w-full">
                <span className="text-4xl font-semibold underline decoration-2 underline-offset-2">
                  On top of this,
                </span>{" "}
                Dyslexics have to deal with common misunderstandings of their
                condition.
              </p>
            </ProblemLeft>
            <ProblemRight progress={progress}>
              <div>
                <div className="p-8 bg-secondAccent flex justify-center items-center">
                  <p className="text-3xl"> 
                    Everyday tasks are excruciatingly frustrating, with text
                    being substituted, reversed, inserted, omitted and even
                    combined,{" "}
                    <span className="font-bold">at the same time.</span> Even
                    dyslexics who can read decently well may experience severe
                    headache minutes into reading.
                  </p>
                </div>
                <div>
                  <div></div>
                  <div></div>
                </div>
              </div>
            </ProblemRight>
          </ProblemContainer>
        )}
      />
    </TileContent>
  </TileWrapper>
);

export default Problems;
