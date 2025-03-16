import ScrollView from "@/components/ScrollView";
import { ThemedView } from "@/components/ThemedView";
import TimedSections from "@/components/TimedSections";
import { Button, ButtonText } from "@/components/ui/button";
import { VStack } from "@/components/ui/vstack";
import React from "react";
import { StyleSheet } from "react-native";
import { RoundTheDoubles, TimedBullseyes, TimedTriples } from "./Sections";

interface TimedTrainingProps {
  minsPerRound?: number;
  setDoubles: (value: number) => void;
  setTriples: (value: number) => void;
  setOuters: (value: number) => void;
  setBullseyes: (value: number) => void;
  onFinish: () => void;
}

export default function TimedTraining({
  setDoubles,
  setTriples,
  setOuters,
  setBullseyes,
  onFinish,
  minsPerRound = 5,
}: TimedTrainingProps) {
  const timerInterval = minsPerRound * 60 * 1000;
  const isTimed = minsPerRound > 0;

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <TimedSections
          sections={[
            {
              component: <TimedTriples setTriples={setTriples} />,
              isTimed,
            },
            {
              component: (
                <TimedBullseyes
                  setOuters={setOuters}
                  setBullseyes={setBullseyes}
                />
              ),
              isTimed,
            },
            {
              component: (
                <VStack>
                  <RoundTheDoubles setDoubles={setDoubles} />
                  <Button
                    action={"positive"}
                    variant={"solid"}
                    size={"lg"}
                    onPress={onFinish}
                  >
                    <ButtonText>Finish</ButtonText>
                  </Button>
                </VStack>
              ),
            },
          ]}
          interval={timerInterval}
        />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
