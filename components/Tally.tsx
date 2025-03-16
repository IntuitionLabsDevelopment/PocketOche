import { Text } from "@/components/ui/text";

import { Button, ButtonText } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";
import { HStack } from "./ui/hstack";
type TallyType = "single" | "multi";
interface TallyProps {
  heading?: string;
  onChange?: (value: number) => void;
  type?: TallyType;
}
export default function Tally({
  heading,
  onChange,
  type = "single",
}: TallyProps) {
  const [counter, setCounter] = useState(0);
  useEffect(() => {
    if (onChange) {
      onChange(counter);
    }
  }, [counter, onChange]);
  const increment = (amount: number) => setCounter(counter + amount);
  const decrement = () => {
    if (counter > 0) {
      setCounter(counter - 1);
    }
  };
  function tallyButton(title: string, onPress: () => void) {
    return (
      <Button size={"lg"} onPress={onPress}>
        <ButtonText size="xl">{title}</ButtonText>
      </Button>
    );
  }
  return (
    <ThemedView style={styles.container}>
      {heading && <ThemedText type="subtitle">{heading}</ThemedText>}
      {type === "single" ? (
        tallyButton("+", () => increment(1))
      ) : (
        <HStack space="md">
          {[1, 2, 3].map((value) => (
            <React.Fragment key={value}>
              {tallyButton(`+${value}`, () => increment(value))}
            </React.Fragment>
          ))}
        </HStack>
      )}
      <Text bold={true} size="6xl" className="my-4">
        {counter}
      </Text>
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
