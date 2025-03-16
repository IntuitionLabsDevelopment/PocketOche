import Tally from "@/components/Tally";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import React from "react";
import { StyleSheet } from "react-native";

export function RoundTheDoubles({
  setDoubles,
}: {
  setDoubles: (value: number) => void;
}) {
  return (
    <ThemedView style={styles.section}>
      <ThemedText type="title">Doubles</ThemedText>
      <Tally onChange={setDoubles} />
    </ThemedView>
  );
}

export function TimedTriples({
  setTriples,
}: {
  setTriples: (value: number) => void;
}) {
  return (
    <ThemedView style={styles.section}>
      <ThemedText type="title">T20</ThemedText>
      <Tally onChange={setTriples} />
    </ThemedView>
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
    <ThemedView style={styles.section}>
      <ThemedText type="title">Bullseyes</ThemedText>
      <ThemedView style={styles.bull}>
        <Tally heading="Outer" onChange={setOuters} />
        <Tally heading="Bull" onChange={setBullseyes} />
      </ThemedView>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginVertical: 16,
    justifyContent: "center",
    alignItems: "center",
    gap: 16,
  },
  bull: {
    flexDirection: "row",
    flex: 1,
    width: "100%",
    justifyContent: "space-evenly",
  },
  finishButton: {
    backgroundColor: "#30DD00",
    padding: 16,
  },
});
