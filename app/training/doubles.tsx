import ScrollView from "@/components/ScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button, ButtonText } from "@/components/ui/button";
import { useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

export default function DoublesTraining() {
  const router = useRouter();

  return (
    <ScrollView>
      <ThemedText type="description">
        Go through the numbers 1-20, hitting as many doubles as you can with
        three darts at each number.
      </ThemedText>
      <ThemedView style={styles.titleContainer}>
        <Button
          action={"positive"}
          size={"xl"}
          onPress={() => router.push("/training/doubles-session")}
        >
          <ButtonText>Start New Session</ButtonText>
        </Button>
      </ThemedView>
    </ScrollView>
  );
}
const styles = StyleSheet.create({
  titleContainer: {
    height: 50,
    flexDirection: "row",
    alignItems: "center",
    gap: 8,
    flex: 1,
    justifyContent: "center",
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
});
