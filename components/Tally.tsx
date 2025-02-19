import { useEffect, useState } from "react";
import { Button, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedView } from "./ThemedView";

interface TallyProps {
  heading?: string;
  onChange?: (value: number) => void;
  allowNegative?: boolean;
}

export default function Tally({
  heading,
  onChange,
  allowNegative = true,
}: TallyProps) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    if (onChange) {
      onChange(counter);
    }
  }, [counter, onChange]);

  const increment = () => setCounter(counter + 1);
  const decrement = () => {
    if (allowNegative || counter > 0) {
      setCounter(counter - 1);
    }
  };

  return (
    <ThemedView style={styles.container}>
      {heading && <ThemedText type="subtitle">{heading}</ThemedText>}
      <Button onPress={increment} title="+" />
      <ThemedText type="title">{counter}</ThemedText>
      <Button onPress={decrement} title="-" />
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
});
