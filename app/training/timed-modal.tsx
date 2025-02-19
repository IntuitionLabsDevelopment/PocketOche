import ScrollView from "@/components/ScrollView";
import Tally from "@/components/Tally";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { useRouter } from "expo-router";
import { Button, StyleSheet } from "react-native";

export default function Modal() {
  const router = useRouter();

  const onFinish = () => {
    // Save scores
    // todo: save to db
    // Go back to main screen
    router.back();
  };

  return (
    <ScrollView>
      <ThemedView style={styles.container}>
        <ThemedView style={styles.section}>
          <ThemedText type="title">Triples</ThemedText>
          <Tally />
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedText type="title">Bullseyes</ThemedText>
          <ThemedView style={styles.bull}>
            <Tally heading="Outer" />
            <Tally heading="Bull" />
          </ThemedView>
        </ThemedView>
        <ThemedView style={styles.section}>
          <ThemedText type="title">Doubles</ThemedText>
          <Tally />
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
