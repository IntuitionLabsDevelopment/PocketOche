import { Button, ButtonText } from "@/components/ui/button";
import React, { useEffect, useState } from "react";
import { Animated, StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
interface TimedSection {
  component: React.ReactNode;
  timed?: boolean;
}
interface TimedSectionsProps {
  sections: TimedSection[];
  interval: number; // interval in milliseconds
}

export default function TimedSections({
  sections,
  interval,
}: TimedSectionsProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const progress = useState(new Animated.Value(0))[0];
  const increment = () => {
    if (currentIndex < sections.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };
  const decrement = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };
  useEffect(() => {
    const animateProgress = () => {
      progress.setValue(0);
      Animated.timing(progress, {
        toValue: 1,
        duration: interval,
        useNativeDriver: false,
      }).start();
    };
    const timer = setInterval(() => {
      if (!sections[currentIndex].timed) {
        return;
      }
      setCurrentIndex((prevIndex) => (prevIndex + 1) % sections.length);
    }, interval);
    if (sections[currentIndex].timed) {
      animateProgress();
    }
    return () => clearInterval(timer);
  }, [currentIndex, interval, progress]);
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Button
          action={"primary"}
          variant={"outline"}
          size={"sm"}
          onPress={decrement}
        >
          <ButtonText>Back</ButtonText>
        </Button>
        <ThemedText type="title">
          {currentIndex + 1} / {sections.length}
        </ThemedText>
        <Button
          action={"primary"}
          variant={"outline"}
          size={"md"}
          onPress={increment}
        >
          <ButtonText>Next</ButtonText>
        </Button>
      </View>
      {sections[currentIndex].timed && (
        <View style={styles.progressBarContainer}>
          <Animated.View
            style={[
              styles.progressBar,
              {
                width: progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: ["0%", "100%"],
                }),
              },
            ]}
          />
        </View>
      )}
      {sections.map((section, index) => (
        <View
          key={index}
          style={{
            display: index === currentIndex ? "flex" : "none",
          }}
        >
          {section.component}
        </View>
      ))}
    </View>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
  },
  progressBarContainer: {
    height: 4,
    width: "100%",
    backgroundColor: "#e0e0e0",
    marginTop: 8,
  },
  progressBar: {
    height: "100%",
    backgroundColor: "#3b5998",
  },
});
