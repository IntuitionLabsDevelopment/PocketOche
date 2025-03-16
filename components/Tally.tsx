import { Button, ButtonText } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface TallyProps {
  heading?: string;
  onChange?: (value: number) => void;
}

export default function Tally({ heading, onChange }: TallyProps) {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    if (onChange) {
      onChange(counter);
    }
  }, [counter, onChange]);
  const increment = () => setCounter(counter + 1);
  const decrement = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };
  function tallyButton(title: string, onPress: () => void) {
    return (
      <Button
        action={"primary"}
        variant={"solid"}
        size={"lg"}
        onPress={onPress}
      >
        <ButtonText>{title}</ButtonText>
      </Button>
    );
  }
  return (
    <ThemedView style={styles.container}>
      {heading && <ThemedText type="subtitle">{heading}</ThemedText>}
      {tallyButton("+", increment)}
      <ThemedText style={[styles.counter]}>{counter}</ThemedText>
      {tallyButton("-", decrement)}
    </ThemedView>
  );
}
const styles = StyleSheet.create({
  container: {
    gap: 8,
    marginBottom: 8,
    justifyContent: "center",
    alignItems: "center",
  },
  counter: {
    fontSize: 40,
    fontWeight: "bold",
    lineHeight: 40,
  },
  button: {
    padding: 24,
  },
  buttonText: {
    fontSize: 32,
  },
});
