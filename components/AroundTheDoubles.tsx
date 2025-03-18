import { Button, ButtonText } from "@/components/ui/button";
import * as schema from "@/db/schema";
import { drizzle } from "drizzle-orm/expo-sqlite";
import { useSQLiteContext } from "expo-sqlite";
import { default as React, useEffect, useState } from "react";
import TrainingSection from "./TrainingSection";
import { Heading } from "./ui/heading";
import { Text } from "./ui/text";
import { VStack } from "./ui/vstack";

interface AroundTheDoublesProps {
  setDoubles?: (value: number) => void;
  onFinish?: () => void;
}
export function AroundTheDoubles({
  setDoubles,
  onFinish,
}: AroundTheDoublesProps) {
  const db = useSQLiteContext();
  const drizzleDb = drizzle(db, {
    schema,
  });

  const [activeNumber, setActiveNumber] = useState<number>(1);
  const [doublesHit, setDoublesHit] = useState<number[]>(new Array(20).fill(0));
  const totalDoubles = doublesHit.reduce((acc, value) => acc + value, 0);

  useEffect(() => {
    if (setDoubles) setDoubles(totalDoubles);
  }, [activeNumber, doublesHit, setDoubles, totalDoubles]);

  const finishDoubles = async () => {
    const scores = {
      scores: doublesHit,
    };
    await drizzleDb.insert(schema.doublesTrainingTable).values(scores);
    if (onFinish) onFinish();
  };

  if (activeNumber > 20) {
    return (
      <TrainingSection headerText="Around the Doubles">
        <Heading>Summary</Heading>
        <Text>Total doubles hit: {totalDoubles}/60</Text>
        <Text>Accuracy: {((totalDoubles / 60) * 100).toFixed(2)}%</Text>
        <Heading>Breakdown</Heading>
        {doublesHit.map((value, index) => (
          <Text key={index}>
            {index + 1}: {value}
          </Text>
        ))}
        <Button action={"positive"} onPress={finishDoubles}>
          <ButtonText>Complete Training</ButtonText>
        </Button>
      </TrainingSection>
    );
  }

  return (
    <TrainingSection headerText="Around the Doubles">
      <Text size="lg">Aiming for double</Text>
      <Text bold size="5xl">
        {activeNumber}
      </Text>
      <VStack space="4xl">
        {[0, 1, 2, 3].map((value) => (
          <Button
            key={value}
            size={"xl"}
            onPress={() => {
              const newDoublesHit = [...doublesHit];
              newDoublesHit[activeNumber - 1] += value;
              setDoublesHit(newDoublesHit);
              setActiveNumber(activeNumber + 1);
            }}
          >
            <ButtonText size="xl">
              {value > 0 && "+"}
              {value}
            </ButtonText>
          </Button>
        ))}
      </VStack>
    </TrainingSection>
  );
}
