import Tally from "@/components/Tally";
import React from "react";
import TrainingSection from "../TrainingSection";
import { Box } from "../ui/box";

export function TimedTriples({
  setTriples,
}: {
  setTriples: (value: number) => void;
}) {
  return (
    <TrainingSection headerText="T20">
      <Tally onChange={setTriples} type="multi" />
    </TrainingSection>
  );
}

export function TimedBullseyes({
  setOuters,
  setBullseyes,
}: {
  setOuters: (value: number) => void;
  setBullseyes: (value: number) => void;
}) {
  return (
    <TrainingSection headerText="Bullseyes">
      <Box className="flex-row justify-evenly w-full">
        <Tally heading="Outer" onChange={setOuters} />
        <Tally heading="Bull" onChange={setBullseyes} />
      </Box>
    </TrainingSection>
  );
}
