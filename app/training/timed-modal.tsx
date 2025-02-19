import ScrollView from "@/components/ScrollView";
import Tally from "@/components/Tally";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { useState } from "react";
import { Button, StyleSheet } from "react-native";

export default function Modal() {
  const router = useRouter();

  const [triples, setTriples] = useState(0);
  const [outerBull, setOuterBull] = useState(0);
  const [bull, setBull] = useState(0);
  const [doubles, setDoubles] = useState(0);

  const onFinish = () => {
    // Save scores to db
    const scores = {
      triples,
      outerBull,
      bull,
      doubles,
    };
    // todo: save scores to db
    console.log("Scores to save:", scores);

    // Go back to main screen
    router.back();
  };

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.section}>
          <ThemedText type="title">Triples</ThemedText>
          <Tally onChange={setTriples} allowNegative={false} />
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedText type="title">Bullseyes</ThemedText>
          <ThemedView style={styles.bull}>
            <Tally
              heading="Outer"
              onChange={setOuterBull}
              allowNegative={false}
            />
            <Tally heading="Bull" onChange={setBull} allowNegative={false} />
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedText type="title">Doubles</ThemedText>
          <Tally onChange={setDoubles} allowNegative={false} />
        </ThemedView>
        <Button title="Finish" onPress={onFinish} />
      </ThemedView>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  section: {
    marginVertical: 16,
  },
  bull: {
    marginTop: 8,
    flexDirection: "row",
    flex: 1,
    justifyContent: "space-evenly",
  },
});
