import ScrollView from "@/components/ScrollView";
import { ThemedText } from "@/components/ThemedText";
import { ThemedView } from "@/components/ThemedView";
import { Button, ButtonText } from "@/components/ui/button";
import { Href, useRouter } from "expo-router";
import React from "react";
import { StyleSheet } from "react-native";

const training: {
  title: string;
  route: Href;
}[] = [
  {
    title: "Timed Training",
    route: "/training/timed",
  },
  {
    title: "Around the Doubles",
    route: "/training/doubles",
  },
];

export default function TimedTraining() {
  const router = useRouter();
  return (
    <ScrollView>
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">Pocket Oche</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Training</ThemedText>
        {training.map((item) => (
          <Button
            action={"primary"}
            variant={"solid"}
            size={"lg"}
            onPress={() => {
              router.push(item.route);
            }}
            key={item.title}
          >
            <ButtonText>{item.title}</ButtonText>
          </Button>
        ))}
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
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
  },
  reactLogo: {
    height: 178,
    width: 290,
    bottom: 0,
    left: 0,
    position: "absolute",
  },
});
