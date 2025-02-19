import { useState } from "react";
import { ThemedView } from "./ThemedView";
import { Button, StyleSheet } from "react-native";
import { ThemedText } from "./ThemedText";

interface TallyProps {
  heading?: string;
}

export default function Tally({ heading }: TallyProps) {
  const [counter, setCounter] = useState(0);

  return (
    <ThemedView style={styles.container}>
      {heading && <ThemedText type="subtitle">{heading}</ThemedText>}
      <Button onPress={() => setCounter(counter + 1)} title="+" />
      <ThemedText type="title">{counter}</ThemedText>
      <Button onPress={() => setCounter(counter - 1)} title="-" />
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
